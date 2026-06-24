import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API client initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini API client:", error);
  }
} else {
  console.warn("GEMINI_API_KEY is not defined. The app will run in fallback simulation mode.");
}

// API Routes
app.post("/api/predict", async (req, res) => {
  const { teamA, teamB, groupContext } = req.body;

  if (!teamA || !teamB) {
    return res.status(400).json({ error: "Les noms des équipes sont requis." });
  }

  // Fallback demo prediction if Gemini client is unavailable
  if (!ai) {
    const scoreA = Math.floor(Math.random() * 3);
    const scoreB = Math.floor(Math.random() * 3);
    const simulatedResponse = `[MODE SIMULATION - Pas de clé API] 
Analyse tactique pour le match ${teamA} vs ${teamB} (${groupContext || 'Phase de groupes'}):
- **Forces de ${teamA}**: Excellente cohésion collective, transition rapide.
- **Forces de ${teamB}**: Impact physique au milieu de terrain, contre-attaques fulgurantes.
- **Analyse du match**: Une rencontre équilibrée avec de nombreuses opportunités de part et d'autre.
- **Score Prédit**: ${teamA} ${scoreA} - ${scoreB} ${teamB}.
- **Joueur à suivre**: L'attaquant vedette qui pourrait débloquer la situation en fin de match.`;
    
    return res.json({ prediction: simulatedResponse, isFallback: true });
  }

  try {
    const prompt = `Vous êtes un analyste de football professionnel français de renommée mondiale. 
Fournissez une analyse tactique détaillée, passionnante et concise en français pour le match de la Coupe du Monde 2026 suivant :
Match : ${teamA} contre ${teamB}
Contexte : ${groupContext || "Phase de groupes"}

Le format de votre réponse doit être en Markdown élégant et structuré de la manière suivante :
### 📊 Analyse Tactique : ${teamA} vs ${teamB}

* **Points clés pour ${teamA}** : [Forces, tactiques ou faiblesses]
* **Points clés pour ${teamB}** : [Forces, tactiques ou faiblesses]
* **Le Scénario Probable** : [Comment le match va se dérouler tactiquement]
* **🔮 Score Prédit** : **${teamA} [Score] - [Score] ${teamB}**
* **⭐ Joueur clé** : [Nom du joueur à suivre et pourquoi]`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const predictionText = response.text || "Désolé, impossible de générer une analyse pour le moment.";
    return res.json({ prediction: predictionText, isFallback: false });

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    return res.status(500).json({ 
      error: "Erreur lors de la génération de la prédiction.", 
      details: error.message || error 
    });
  }
});

// Serve static assets / Vite setup
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Vite server failed to start:", err);
});
