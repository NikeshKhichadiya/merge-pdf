import { mergePdfBuffers } from "../services/pdf.service.mjs";

export async function mergeController(req, res) {
    try {
        const outName = (req.body?.outName || "merged.pdf").replace(/[/\\]/g, "");
        const files = req.files || [];

        if (!files.length) {
            return res.status(400).json({ ok: false, message: "No PDF files uploaded." });
        }

        // Preserve client order: multer keeps order of appends.
        const buffers = files.map(f => f.buffer);

        const mergedBuffer = await mergePdfBuffers(buffers);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="${outName}"`);
        return res.send(Buffer.from(mergedBuffer));
    } catch (err) {
        console.error("Merge failed:", err);
        return res.status(500).json({
            ok: false,
            message: err?.message || "Failed to merge PDFs (possibly encrypted or corrupted file)."
        });
    }
}
