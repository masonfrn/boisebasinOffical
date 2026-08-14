// Unsigned browser uploads. The cloud name and preset are public by design —
// the preset itself is what restricts what can be uploaded, so lock it down in
// the Cloudinary dashboard (image-only, size cap, dedicated folder).
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() ?? "";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET?.trim() ?? "";

export const CLOUDINARY_CONFIGURED = CLOUD_NAME !== "" && UPLOAD_PRESET !== "";

export async function uploadPhoto(file: File): Promise<string> {
  if (!CLOUDINARY_CONFIGURED) throw new Error("Cloudinary is not configured");

  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body,
  });
  if (!res.ok) throw new Error("Upload failed");

  const data = (await res.json()) as { secure_url?: string };
  if (!data.secure_url) throw new Error("Upload returned no URL");
  return data.secure_url;
}

/**
 * Cap the delivered size before handing a photo to the estimator. Claude bills
 * per image token and a phone camera original costs several times what a
 * 1600px version does without improving the volume estimate.
 */
export function toEstimateUrl(secureUrl: string): string {
  return secureUrl.replace("/upload/", "/upload/w_1600,c_limit,q_auto,f_auto/");
}
