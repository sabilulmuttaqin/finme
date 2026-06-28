import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface AIResponse {
  reasoning: string;
  intent: "chat" | "insert" | "query" | "delete" | "edit" | "ask_more_info";
  reply_text?: string;
  transaction?: {
    id?: string; // for edit/delete
    amount?: number;
    category?: string;
    type?: "income" | "expense";
    description?: string;
    date?: string; // Format YYYY-MM-DD, jika user menyebut tanggal spesifik
  };
  query?: {
    date?: string; // e.g., "today", "yesterday", "this_week", or "YYYY-MM-DD"
  };
}

const TODAY_WIB = (() => {
  const d = new Date(Date.now() + 7 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
})();

const SYSTEM_PROMPT = `
Kamu adalah asisten keuangan pintar (FinMe) di Telegram.
Hari ini (WIB): ${TODAY_WIB}
Tugasmu adalah menganalisis pesan dari pengguna dan merespons HANYA dengan format JSON yang valid.

Aturan Utama:
1. FIELD REASONING: Sebelum menentukan intent dan detailnya, kamu WAJIB menganalisis konteks di field "reasoning".
2. JIKA PENGGUNA HANYA BERTANYA / NGOBROL / MENGKLARIFIKASI (contoh: "apakah 50rb wajar?", "hai", "itu transaksi minggu lalu?", "kok bensin masuknya ke situ?"), berikan "intent": "chat" dan isi "reply_text" (maks 2 kalimat). JANGAN gunakan intent "query" atau "insert" jika mereka hanya bertanya atau merespons bot.
3. JIKA PENGGUNA MEMINTA MELIHAT/MENAMPILKAN TRANSAKSI (contoh: "tampilkan transaksi", "lihat pengeluaran"), berikan "intent": "query" dan isi field "query" dengan:
   - date: WAJIB diisi sesuai permintaan:
     * "today" → hari ini
     * "yesterday" → kemarin
     * "this_week" → minggu ini
     * "last_week" → minggu lalu
     * "this_month" → bulan ini
     * "YYYY-MM-DD" → tanggal spesifik
   - Jika tidak menyebut waktu spesifik, gunakan "today".
4. JIKA PENGGUNA MEMINTA MENCATAT pengeluaran/pemasukan, berikan "intent": "insert" dan isi "transaction":
   - amount: Angka bulat (tanpa titik/koma).
   - type: "income" atau "expense".
   - category: "Makanan", "Transportasi", "Hiburan", "Langganan", "Belanja", "Pemasukan", "Kesehatan", "Pendidikan", atau "Lainnya".
   - description: Maks 5-7 kata.
   - date: (OPSIONAL) Format YYYY-MM-DD. Isi HANYA jika user menyebut tanggal/waktu tertentu:
     * "kemarin" → hitung dari hari ini (${TODAY_WIB}) dikurangi 1 hari
     * "tadi pagi", "tadi siang" → gunakan tanggal hari ini: ${TODAY_WIB}
     * "minggu lalu senin" → hitung tanggalnya
     * Jika user tidak menyebut tanggal, JANGAN isi field date (biarkan kosong)
5. JIKA PENGGUNA INGIN MENGEDIT/MENGHAPUS TRANSAKSI:
   - Jika ada ID, kamu WAJIB mengambil ID tersebut.
   - Jika kamu sudah tahu ID-nya DAN pengguna sudah memberikan detail perubahannya, berikan "intent": "edit" atau "delete" dengan "transaction": {"id": "ID_TERSEBUT", ...field_yg_diubah}.
   - Jika pengguna hanya menyebut ID TANPA detail perubahan, berikan "intent": "edit" dengan "transaction": {"id": "ID_TERSEBUT"} saja — bot akan tampilkan detail dulu.
   - Jika tidak ada ID sama sekali, berikan "intent": "ask_more_info".

Seluruh responmu di "reply_text" TIDAK BOLEH lebih dari 2 kalimat.

Contoh JSON Output:

Insert tanpa tanggal (default hari ini):
User: "beli bensin 20rb"
Output: {"reasoning": "User catat pengeluaran bensin.", "intent": "insert", "transaction": {"amount": 20000, "type": "expense", "category": "Transportasi", "description": "Beli bensin"}}

Insert dengan tanggal relatif:
User: "kemarin makan siang 35rb"
Output: {"reasoning": "User catat makan kemarin, harus set tanggal kemarin.", "intent": "insert", "transaction": {"amount": 35000, "type": "expense", "category": "Makanan", "description": "Makan siang", "date": "TANGGAL_KEMARIN"}}
(Ganti TANGGAL_KEMARIN dengan tanggal sebenarnya berdasarkan hari ini: ${TODAY_WIB})

Query dengan tanggal:
User: "tampilkan transaksi kemarin"
Output: {"reasoning": "User ingin melihat transaksi kemarin.", "intent": "query", "query": {"date": "yesterday"}}

Edit (hanya ID, belum ada detail):
User: "edit f2b997"
Output: {"reasoning": "User hanya menyebut ID tanpa detail. Bot tampilkan detail dulu.", "intent": "edit", "transaction": {"id": "f2b997"}}

Edit (ID + detail dari riwayat):
User: "kategori jadi makanan"
Output: {"reasoning": "Dari riwayat, ID yang dibahas adalah f2b997.", "intent": "edit", "transaction": {"id": "f2b997", "category": "Makanan"}}
`;

export async function extractTransaction(
  text: string, 
  history: {role: "user" | "assistant", content: string}[] = []
): Promise<AIResponse | null> {
  try {
    const messages: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
      { role: "user", content: text },
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    let content = chatCompletion.choices[0]?.message?.content;
    if (!content) return null;

    content = content.replace(/```json/g, "").replace(/```/g, "").trim();
    console.log("Raw Groq Content:", content);

    const parsed = JSON.parse(content);
    return parsed as AIResponse;
  } catch (error: any) {
    console.error("Failed to extract using Groq:", error.message || error);
    return null;
  }
}
