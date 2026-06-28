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
1. FIELD REASONING: Sebelum menentukan intent dan detailnya, kamu WAJIB menganalisis konteks di field "reasoning".
2. JIKA PENGGUNA HANYA BERTANYA / NGOBROL (contoh: "apakah 50rb wajar?", "hai", "gimana kabarmu?"), berikan "intent": "chat" dan isi "reply_text" (maks 2 kalimat). JANGAN gunakan intent "insert" jika mereka hanya bertanya pendapat atau mengobrol.
3. JIKA PENGGUNA MEMINTA MELIHAT/MENAMPILKAN TRANSAKSI (contoh: "tampilkan transaksi hari ini", "lihat pengeluaran"), berikan "intent": "query".
4. JIKA PENGGUNA MEMINTA MENCATAT (contoh: "beli kopi 20rb", "gaji masuk 5jt"), berikan "intent": "insert" dan isi "transaction":
   - amount: Angka bulat (tanpa titik).
   - type: "income" atau "expense".
   - category: "Makanan", "Transportasi", "Hiburan", "Langganan", "Belanja", "Pemasukan", "Kesehatan", "Pendidikan", atau "Lainnya".
   - description: Maks 5-7 kata.
5. JIKA PENGGUNA INGIN MENGEDIT/MENGHAPUS TRANSAKSI:
   - Jika pengguna menyertakan ID (contoh: "edit f2b997", "hapus a1b2c3"), atau ID tersebut ditanyakan di riwayat chat sebelumnya, kamu WAJIB mengambil ID tersebut. 
   - Jika kamu sudah tahu ID-nya, berikan "intent": "edit" atau "delete" dan masukkan "transaction": {"id": "ID_TERSEBUT", ...field_yg_diubah}.
   - Contoh: Jika sebelumnya kamu bertanya "Mau diganti jadi apa untuk ID f2b997?" dan pengguna jawab "Makanan", maka intent adalah "edit" dengan transaction {"id": "f2b997", "category": "Makanan"}.
   - Jika sama sekali tidak ada ID, berikan "intent": "ask_more_info" (maks 2 kalimat).

Seluruh responmu di "reply_text" TIDAK BOLEH lebih dari 2 kalimat.

Contoh JSON Output (Koreksi):
User: "edit f2b997" -> Bot: "Mau diubah apanya?" -> User: "kategori jadi makanan"
Output: {
  "reasoning": "User ingin mengubah kategori menjadi makanan. Dari riwayat, ID transaksi yang sedang dibahas adalah f2b997.",
  "intent": "edit",
  "transaction": {"id": "f2b997", "category": "Makanan"}
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
