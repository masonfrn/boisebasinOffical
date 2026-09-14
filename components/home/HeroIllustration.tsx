import Image from "next/image";

/**
 * The hero image is a real photo of the crew, not an illustration — the file
 * keeps its old name so the import in Hero.tsx stays put.
 *
 * The source photo is portrait (3:4), which would tower over the text column
 * next to it on desktop. So the frame is a fixed 4:5 box with the photo cropped
 * to fill it; `object-top` keeps the crop biting into the dirt at the bottom
 * rather than cutting off heads.
 *
 * The caption is a <figcaption>, not a plain div, so screen readers tie the
 * words to the photo instead of reading them as loose text after it.
 */
export default function HeroIllustration() {
  return (
    <figure className="w-full max-w-sm">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] drop-shadow-[0_30px_60px_rgba(11,37,69,0.25)]">
        <Image
          src="/photos/crew-truck-dog.jpg"
          alt="The Boise Basin Junk Removal crew with their hauling truck and dog"
          fill
          priority
          sizes="(min-width: 1024px) 24rem, 100vw"
          className="object-cover object-top"
        />
      </div>
      <figcaption className="mt-4 text-center font-display text-sm font-bold uppercase tracking-[0.14em] text-navy">
        Boise Basin Junk Removal Team
      </figcaption>
    </figure>
  );
}
