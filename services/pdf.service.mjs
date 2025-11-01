import { PDFDocument } from "pdf-lib";

/**
 * Merge an array of PDF ArrayBuffers/Buffers into a single PDF Buffer.
 * Throws if any file is encrypted or unreadable.
 */
export async function mergePdfBuffers(buffers) {
    const merged = await PDFDocument.create();

    for (const buf of buffers) {
        // pdf-lib accepts Uint8Array/ArrayBuffer
        const u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
        const src = await PDFDocument.load(u8, { ignoreEncryption: false }); // throw if encrypted
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach(p => merged.addPage(p));
    }

    return Buffer.from(await merged.save());
}
