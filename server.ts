import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Kencana Bakery API", timestamp: new Date().toISOString() });
});

// API: AI Baker Sommelier & Custom Cake Recommender
app.post("/api/ai/recommend", async (req, res) => {
  try {
    const { prompt, occasion, flavorPreference, dietaryRestrictions, budget } = req.body;
    const ai = getAIClient();

    if (!ai) {
      // Fallback response if no API key is provided
      return res.json({
        recommendation: "Pilihan terbaik kami untuk Anda adalah Signature Pain au Chocolat dengan French Butter dan Classic Sourdough Artisan kami. Untuk perayaan khusus, kami sarankan Basque Burnt Cheesecake kami!",
        pairing: "Nikmati bersama Kencana Single Origin Java Mocha Latte hangat.",
        chefTip: "Hangatkan roti di oven suhu 160°C selama 3 menit untuk tekstur kulit renyah maksimal.",
        suggestedProducts: ["Croissant Almond", "Basque Burnt Cheesecake", "Classic Country Sourdough"]
      });
    }

    const systemPrompt = `Anda adalah "Chef Kencana", Head Baker & Sommelier Pastry profesional dari toko roti ternama 'Kencana Bakery & Patisserie'.
Tugas Anda memberikan rekomendasi produk roti/kue, saran padu padan (pairing) minuman, ide ucapan di atas kue (jika untuk ulang tahun/event), dan tips penyimpanan/penyajian dalam bahasa Indonesia yang hangat, bersahabat, dan menggugah selera.
Format JSON respon yang diinginkan:
{
  "recommendation": "Deskripsi rekomendasi produk pilihan",
  "pairing": "Rekomendasi minuman pendamping",
  "chefTip": "Tips penyajian atau penyimpanan khusus",
  "suggestedProducts": ["Nama Produk 1", "Nama Produk 2", "Nama Produk 3"]
}`;

    const userMessage = `Kebutuhan pelanggan:
- Acara/Momen: ${occasion || "Santap harian & ngemil keluarga"}
- Preferensi Rasa: ${flavorPreference || "Manis gurih seimbang"}
- Kebutuhan Diet: ${dietaryRestrictions || "Halal, standard"}
- Perkiraan Budget: ${budget || "Fleksibel"}
- Catatan Tambahan: ${prompt || "Rekomendasikan yang paling best-seller dan lezat!"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("AI Recommendation Error:", error);
    res.status(500).json({
      error: "Gagal memproses rekomendasi AI.",
      fallback: {
        recommendation: "Kami merekomendasikan Croissant Butter Artisan dan Basque Burnt Cheesecake segar kami.",
        pairing: "Kopi Arabika Toraja atau Teh Earl Grey Hangat.",
        chefTip: "Simpan dalam wadah kedap udara jika ingin dikonsumsi besok pagi.",
        suggestedProducts: ["Butter Croissant", "Basque Burnt Cheesecake", "Roti Sisir Mentega Wisman"]
      }
    });
  }
});

// API: Process Payment Simulation & Generate Receipt
app.post("/api/payment/process", (req, res) => {
  const { orderId, paymentMethod, amount } = req.body;

  const mockTransactionId = `TRX-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  res.json({
    success: true,
    transactionId: mockTransactionId,
    orderId: orderId || `KNC-${Math.floor(10000 + Math.random() * 90000)}`,
    paymentMethod,
    amount,
    status: "PAID",
    paidAt: new Date().toISOString(),
    message: "Pembayaran telah berhasil diverifikasi oleh sistem gateway.",
  });
});

async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bakery App server running on http://0.0.0.0:${PORT}`);
  });
}

start();
