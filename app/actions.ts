"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { photos, votes } from "@/lib/schema";
import { getOrCreateVoterId } from "@/lib/voter";

const MAX_BYTES = 5 * 1024 * 1024;

export type UploadState = { error?: string; ok?: boolean };

export async function uploadPhoto(
  _prev: UploadState,
  formData: FormData,
): Promise<UploadState> {
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please choose a photo." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Only image files are allowed." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Photos must be 5MB or smaller." };
  }

  const blob = await put(`photos/${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type,
  });
  await db.insert(photos).values({ url: blob.url });

  revalidatePath("/");
  return { ok: true };
}

export async function votePhoto(photoId: number): Promise<void> {
  if (!Number.isInteger(photoId)) return;
  const voterId = await getOrCreateVoterId();
  await db.insert(votes).values({ photoId, voterId }).onConflictDoNothing();
  revalidatePath("/");
}
