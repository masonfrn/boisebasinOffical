/**
 * Shrink a photo in the browser before it goes anywhere.
 *
 * Two hard reasons this has to happen client-side:
 *  - Vercel caps a serverless request body at ~4.5MB, and one modern phone
 *    photo can be 5MB by itself. Six of them base64-encoded would never arrive.
 *  - Claude bills by image size, and a full-resolution original costs several
 *    times what a 1600px version does without sizing the load any better.
 */
const MAX_EDGE = 1600;
const JPEG_QUALITY = 0.8;

export type InlinePhoto = {
  /** Base64 payload with no data: prefix — the shape the Messages API wants. */
  data: string;
  mediaType: "image/jpeg";
};

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    img.src = url;
  });
}

/**
 * Returns null when the browser can't decode the file — HEIC straight off an
 * iPhone is the usual culprit. The caller drops that photo and carries on
 * rather than failing the whole quote.
 */
export async function shrinkForEstimate(file: File): Promise<InlinePhoto | null> {
  try {
    const img = await loadImage(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
    const comma = dataUrl.indexOf(",");
    if (comma === -1) return null;

    return { data: dataUrl.slice(comma + 1), mediaType: "image/jpeg" };
  } catch {
    return null;
  }
}

/** Preview thumbnail for a photo we're holding locally rather than hosting. */
export function previewUrlFor(photo: InlinePhoto): string {
  return `data:${photo.mediaType};base64,${photo.data}`;
}
