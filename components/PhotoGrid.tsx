"use client";

import Image from "next/image";
import { startTransition, useOptimistic, useState } from "react";
import { votePhoto } from "@/app/actions";
import type { PhotoWithVotes } from "@/lib/photos";
import Lightbox from "./Lightbox";
import VoteBadge from "./VoteBadge";

export default function PhotoGrid({ photos }: { photos: PhotoWithVotes[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [optimisticPhotos, addVote] = useOptimistic(photos, (current, photoId: number) =>
    current.map((p) =>
      p.id === photoId && !p.hasVoted ? { ...p, votes: p.votes + 1, hasVoted: true } : p,
    ),
  );

  function vote(photoId: number) {
    startTransition(async () => {
      addVote(photoId);
      await votePhoto(photoId);
    });
  }

  if (optimisticPhotos.length === 0) {
    return <p className="text-center opacity-60">No photos yet — be the first to submit one!</p>;
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {optimisticPhotos.map((photo, i) => (
          <li key={photo.id}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="relative block aspect-square w-full overflow-hidden rounded-lg bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-label={`Open photo ${i + 1}`}
            >
              <VoteBadge votes={photo.votes} />
              <Image
                src={photo.url}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <Lightbox
          photos={optimisticPhotos}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
          onVote={vote}
        />
      )}
    </>
  );
}
