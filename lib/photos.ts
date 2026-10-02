/**
 * Shrink a photo in the browser before it goes anywhere.
 *
 * Three hard reasons this has to happen client-side, and before the upload
 * rather than after it:
 *  - A phone photo is 3–12MB and a phone's upload speed is a fraction of its
 *    download speed. Six originals is a minutes-long upload on cell data; six
 *    shrunk copies is a few seconds. The form used to send Cloudinary the
 *    originals and only shrink as a fallback, which is why the photo step hung.
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

async function shrink(file: File): Promise<Blob | null> {
  try {
    const img = await loadImage(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY)
    );

    // iOS Safari holds canvas memory until the element is collected, and it has
    // a small budget for it. Zeroing the size hands the memory back now.
    canvas.width = 0;
    canvas.height = 0;

    return blob;
  } catch {
    return null;
  }
}

// One photo at a time. Decoding a 48MP phone photo takes close to 200MB of
// memory while it's being drawn; six at once is enough for a phone browser to
// stall or kill the tab. Each shrink is well under a second, so queueing them
// costs nothing the customer would notice — and the uploads that follow still
// overlap.
let shrinkQueue: Promise<unknown> = Promise.resolve();

/**
 * Returns a JPEG no larger than MAX_EDGE on its long side, or null when the
 * browser can't decode the file — HEIC anywhere other than Safari is the usual
 * culprit. The caller decides what to do with an undecodable photo.
 */
export function shrinkPhoto(file: File): Promise<Blob | null> {
  const run = shrinkQueue.then(() => shrink(file));
  shrinkQueue = run;
  return run;
}

/**
 * Base64 copy of a shrunk photo, for the path where there's nowhere to host it
 * and the image has to ride along inside the estimate request instead.
 */
export function toInlinePhoto(blob: Blob): Promise<InlinePhoto | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      const comma = dataUrl.indexOf(",");
      resolve(comma === -1 ? null : { data: dataUrl.slice(comma + 1), mediaType: "image/jpeg" });
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(blob);
  });
}
