import express from "express";
import multer from "multer";
import { mergeController } from "../controllers/pdf.controller.mjs";

const router = express.Router();

// Keep files in memory (RAM). Adjust limits to your needs.
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB per file
        files: 50                    // up to 50 PDFs per request
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf" || /\.pdf$/i.test(file.originalname)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed."));
        }
    }
});

// POST /api/pdf/merge
router.post("/merge", upload.array("files"), mergeController);

export default router;
