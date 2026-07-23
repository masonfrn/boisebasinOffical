import Image from "next/image";

export default function HeroIllustration() {
  return (
    <div className="w-full max-w-lg drop-shadow-[0_30px_60px_rgba(11,37,69,0.25)]">
      <Image
        src="/hero-crew.svg"
        alt="Boise Basin Junk Removal crew loading a truck"
        width={560}
        height={460}
        priority
        className="h-auto w-full rounded-[28px]"
      />
    </div>
  );
}
