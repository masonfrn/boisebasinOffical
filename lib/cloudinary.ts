// Unsigned browser uploads. The cloud name and preset are public by design —
// the preset itself is what restricts what can be uploaded, so lock it down in
// the Cloudinary dashboard (image-only, size cap, dedicated folder).
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() ?? "";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET?.trim() ?? "";

export const CLOUDINARY_CONFIGURED = CLOUD_NAME !== "" && UPLOAD_PRESET !== "";

// A browser fetch has no timeout of its own, so an upload that stalls on a weak
// signal would otherwise leave the photo step spinning forever with Continue
// disabled. A shrunk photo is a few hundred KB and lands in a second or two;
// anything still going after this long isn't going to finish.
const UPLOAD_TIMEOUT_MS = 45_000;

/**
 * Pass the shrunk copy from lib/photos.ts, not the camera original — see the
 * note at the top of that file. The original is only worth sending when the
 * browser couldn't decode it (Cloudinary can read HEIC even where Chrome can't).
 */
export async function uploadPhoto(file: Blob, filename: string): Promise<string> {
  if (!CLOUDINARY_CONFIGURED) throw new Error("Cloudinary is not configured");

  const body = new FormData();
  body.append("file", file, filename);
  body.append("upload_preset", UPLOAD_PRESET);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body,
      signal: controller.signal,
    });
    if (!res.ok) throw new Error("Upload failed");

    const data = (await res.json()) as { secure_url?: string };
    if (!data.secure_url) throw new Error("Upload returned no URL");
    return data.secure_url;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Small square for the preview tile. Only needed for a photo the browser
 * couldn't decode itself; everything else previews from the local copy without
 * a download.
 */
export function toThumbUrl(secureUrl: string): string {
  return secureUrl.replace("/upload/", "/upload/w_320,h_320,c_fill,q_auto,f_auto/");
}

/**
 * Cap the delivered size before handing a photo to the estimator. Claude bills
 * per image token and a phone camera original costs several times what a
 * 1600px version does without improving the volume estimate.
 */
export function toEstimateUrl(secureUrl: string): string {
  return secureUrl.replace("/upload/", "/upload/w_1600,c_limit,q_auto,f_auto/");
}
