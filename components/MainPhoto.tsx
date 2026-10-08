import Image from "next/image";

// Put your photo in the /public folder, then set this to its path,
// e.g. "/main.jpg" for public/main.jpg. Leave as null to show the placeholder.
const MAIN_PHOTO: string | null = "/main.jpg";
const MAIN_PHOTO_ALT = "Sid's tattoo";

export default function MainPhoto() {
  return (
    <section className="relative mx-auto aspect-[3/4] w-full max-w-64 overflow-hidden rounded-xl">
      {MAIN_PHOTO ? (
        <Image
          src={MAIN_PHOTO}
          alt={MAIN_PHOTO_ALT}
          fill
          priority
          sizes="256px"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center border-2 border-dashed border-foreground/20 bg-foreground/5 text-foreground/50">
          Main photo placeholder
        </div>
      )}
    </section>
  );
}
