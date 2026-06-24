var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
import_dotenv.default.config();
var app = (0, import_express.default)();
app.use(import_express.default.json());
var PORT = 3e3;
var ai = null;
var GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (GEMINI_API_KEY) {
  try {
    ai = new import_genai.GoogleGenAI({
      apiKey: GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
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
app.post("/api/predict", async (req, res) => {
  const { teamA, teamB, groupContext } = req.body;
  if (!teamA || !teamB) {
    return res.status(400).json({ error: "Les noms des \xE9quipes sont requis." });
  }
  if (!ai) {
    const scoreA = Math.floor(Math.random() * 3);
    const scoreB = Math.floor(Math.random() * 3);
    const simulatedResponse = `[MODE SIMULATION - Pas de cl\xE9 API] 
Analyse tactique pour le match ${teamA} vs ${teamB} (${groupContext || "Phase de groupes"}):
- **Forces de ${teamA}**: Excellente coh\xE9sion collective, transition rapide.
- **Forces de ${teamB}**: Impact physique au milieu de terrain, contre-attaques fulgurantes.
- **Analyse du match**: Une rencontre \xE9quilibr\xE9e avec de nombreuses opportunit\xE9s de part et d'autre.
- **Score Pr\xE9dit**: ${teamA} ${scoreA} - ${scoreB} ${teamB}.
- **Joueur \xE0 suivre**: L'attaquant vedette qui pourrait d\xE9bloquer la situation en fin de match.`;
    return res.json({ prediction: simulatedResponse, isFallback: true });
  }
  try {
    const prompt = `Vous \xEAtes un analyste de football professionnel fran\xE7ais de renomm\xE9e mondiale. 
Fournissez une analyse tactique d\xE9taill\xE9e, passionnante et concise en fran\xE7ais pour le match de la Coupe du Monde 2026 suivant :
Match : ${teamA} contre ${teamB}
Contexte : ${groupContext || "Phase de groupes"}

Le format de votre r\xE9ponse doit \xEAtre en Markdown \xE9l\xE9gant et structur\xE9 de la mani\xE8re suivante :
### \u{1F4CA} Analyse Tactique : ${teamA} vs ${teamB}

* **Points cl\xE9s pour ${teamA}** : [Forces, tactiques ou faiblesses]
* **Points cl\xE9s pour ${teamB}** : [Forces, tactiques ou faiblesses]
* **Le Sc\xE9nario Probable** : [Comment le match va se d\xE9rouler tactiquement]
* **\u{1F52E} Score Pr\xE9dit** : **${teamA} [Score] - [Score] ${teamB}**
* **\u2B50 Joueur cl\xE9** : [Nom du joueur \xE0 suivre et pourquoi]`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt
    });
    const predictionText = response.text || "D\xE9sol\xE9, impossible de g\xE9n\xE9rer une analyse pour le moment.";
    return res.json({ prediction: predictionText, isFallback: false });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return res.status(500).json({
      error: "Erreur lors de la g\xE9n\xE9ration de la pr\xE9diction.",
      details: error.message || error
    });
  }
});
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite middleware...");
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}
setupVite().catch((err) => {
  console.error("Vite server failed to start:", err);
});
//# sourceMappingURL=server.cjs.map
