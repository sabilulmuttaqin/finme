import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface ParsedTransaction {
  amount: number;
  category: string;
  type: "income" | "expense";
  description: string;
}

const SYSTEM_PROMPT = `
Kamu adalah asisten keuangan pintar (FinMe) yang bertugas mengekstrak informasi transaksi keuangan dari pesan chat Telegram.
Tugasmu adalah menganalisis teks dari pengguna dan merespons HANYA dengan format JSON yang valid, tanpa teks tambahan apa pun.

Aturan ekstraksi:
1. amount: Angka bulat positif (number) yang merepresentasikan nominal uang. Hapus titik/koma. Contoh: 50rb -> 50000, 1.5jt -> 1500000.
2. type: Harus bernilai "income" (untuk pemasukan/gajian/transfer masuk) atau "expense" (untuk pengeluaran/beli/bayar).
3. category: Pilih salah satu dari kategori berikut yang paling cocok:
   - "Makanan" (contoh: makan, minum, kopi, mcd, indomaret)
   - "Transportasi" (contoh: bensin, gocar, grab, tol, parkir)
   - "Langganan" (contoh: netflix, spotify, internet, listrik)
   - "Belanja" (contoh: baju, sepatu, skincare, shopee)
   - "Pemasukan" (contoh: gajian, bonus, dikasih uang, cashback)
   - "Lainnya" (jika tidak masuk ke kategori di atas)
4. description: Deskripsi singkat transaksi (maksimal 5-7 kata).

Contoh 1:
User: "Makan siang di warteg 25rb"
Output: {"amount": 25000, "category": "Makanan", "type": "expense", "description": "Makan siang di warteg"}

Contoh 2:
User: "Gajian bulan ini masuk 5 juta"
Output: {"amount": 5000000, "category": "Pemasukan", "type": "income", "description": "Gajian bulan ini"}

Contoh 3:
User: "bayar netflix 186000"
Output: {"amount": 186000, "category": "Langganan", "type": "expense", "description": "Bayar langganan netflix"}
`;

export async function extractTransaction(text: string): Promise<ParsedTransaction | null> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: text },
      ],
      model: "llama3-8b-8192", // Fast and capable model
      temperature: 0.1, // Low temperature for deterministic output
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content);
    return {
      amount: Number(parsed.amount),
      category: parsed.category,
      type: parsed.type,
      description: parsed.description,
    };
  } catch (error) {
    console.error("Failed to extract transaction using Groq:", error);
    return null;
  }
}
