import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pdfRouter from "./routes/pdf.routes.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Static frontend
app.use(express.static(path.join(__dirname, "public")));

// PDF routes (API)
app.use("/api/pdf", pdfRouter);

// Health check
app.get("/api/health", (_, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`PDF Merger running: http://localhost:${PORT}`);
});
