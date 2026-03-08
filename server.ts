import express from "express";
import { createServer as createViteServer } from "vite";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, model, temperature, max_tokens } = req.body;
      
      const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "Groq API key is not configured on the server." });
      }

      const groq = new Groq({ apiKey });

      const chatCompletion = await groq.chat.completions.create({
        messages,
        model: model || "llama-3.3-70b-versatile",
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 2048,
        top_p: 1,
        stream: false,
      });

      res.json(chatCompletion);
    } catch (error: any) {
      console.error("Groq API Error:", error);
      res.status(500).json({ error: error.message || "An error occurred during chat completion." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    app.use(express.static("dist"));
    
    // SPA fallback
    const path = await import("path");
    app.get("*", (req, res) => {
      res.sendFile(path.resolve("dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
