"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { PhotoWithVotes } from "@/lib/photos";
import VoteBadge from "./VoteBadge";

type Props = {
  photos: PhotoWithVotes[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  onVote: (photoId: number) => void;
};

export default function Lightbox({ photos, index, onIndexChange, onClose, onVote }: Props) {
  const count = photos.length;
  const photo = photos[index];
  const prev = () => onIndexChange((index - 1 + count) % count);
  const next = () => onIndexChange((index + 1) % count);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onIndexChange((index - 1 + count) % count);
      else if (e.key === "ArrowRight") onIndexChange((index + 1) % count);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onClose, onIndexChange]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  if (!photo) return null;

  const arrow =
    "absolute top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-3 text-3xl leading-none text-white hover:bg-white/30";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${count}`}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-20 text-3xl leading-none text-white/80 hover:text-white"
      >
        ×
      </button>

      <div
        className="relative h-[75vh] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <VoteBadge votes={photo.votes} />
        <Image
          key={photo.id}
          src={photo.url}
          alt={`Photo ${index + 1}`}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
        {count > 1 && (
          <>
            <button type="button" onClick={prev} aria-label="Previous photo" className={`${arrow} left-2`}>
              ‹
            </button>
            <button type="button" onClick={next} aria-label="Next photo" className={`${arrow} right-2`}>
              ›
            </button>
          </>
        )}
      </div>

      <div className="flex items-center gap-4 text-white" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => onVote(photo.id)}
          disabled={photo.hasVoted}
          className="rounded-full bg-white px-6 py-2 font-semibold text-black disabled:bg-white/30 disabled:text-white"
        >
          {photo.hasVoted ? "Voted ♥" : "Vote ♥"}
        </button>
        <span className="text-sm opacity-70">
          {index + 1} / {count}
        </span>
      </div>
    </div>
  );
}
