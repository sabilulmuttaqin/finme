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
  };
  query?: {
    date?: string; // e.g., "today", "yesterday", or specific date string "2023-10-24"
  };
}

const SYSTEM_PROMPT = `
Kamu adalah asisten keuangan pintar (FinMe) di Telegram. 
Tugasmu adalah menganalisis pesan dari pengguna dan merespons HANYA dengan format JSON yang valid.

Aturan Utama:
1. FIELD REASONING: Sebelum menentukan intent dan detailnya, kamu WAJIB menganalisis konteks di field "reasoning". Pikirkan baik-baik masuk ke kategori mana (jangan asal "Lainnya").
2. Jika pengguna sekadar menyapa ("hai"), ngobrol santai, berikan "intent": "chat" dan isi "reply_text" (MAKS 2 KALIMAT).
3. Jika pengguna meminta mencatat, berikan "intent": "insert" dan isi "transaction":
   - amount: Angka bulat (tanpa titik). Juta = 000000. Miliar = 000000000.
   - type: "income" atau "expense".
   - category: Gunakan kategori yang paling cocok: "Makanan", "Transportasi", "Hiburan" (bioskop, konser, game), "Langganan", "Belanja", "Pemasukan", "Kesehatan", "Pendidikan", atau "Lainnya".
   - description: Maks 5-7 kata.
4. Jika pengguna MENGOREKSI transaksi sebelumnya (misal "maksudnya 26 miliar" atau "salah, itu 50rb"), baca riwayat asisten sebelumnya untuk mendapatkan "ID: xxx". Lalu berikan "intent": "edit", dan masukkan "transaction": {"id": "xxx", "amount": 26000000000}.
5. Jika pengguna ingin menghapus/mengedit tanpa ID, balas dengan "intent": "ask_more_info" (maks 2 kalimat).
6. Jika pengguna memberikan ID untuk dihapus/diedit, berikan "intent": "delete" atau "edit".

Seluruh responmu di "reply_text" TIDAK BOLEH lebih dari 2 kalimat.

Contoh JSON Output (Koreksi):
User: "beli rumah 26M"
Assistant: "Tercatat: Rp 26.000.000 untuk Lainnya (Pengeluaran)... ID: a1b2c3"
User: "maksudnya 26 miliar"
Output: {
  "reasoning": "User mengoreksi nominal transaksi sebelumnya menjadi 26.000.000.000. Saya melihat ID transaksi sebelumnya adalah a1b2c3.",
  "intent": "edit",
  "transaction": {"id": "a1b2c3", "amount": 26000000000, "category": "Belanja", "type": "expense"}
}
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
