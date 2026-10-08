import { desc, eq, sql } from "drizzle-orm";
import { db } from "./db";
import { photos, votes } from "./schema";

export type PhotoWithVotes = {
  id: number;
  url: string;
  votes: number;
  hasVoted: boolean;
};

export async function getPhotos(voterId?: string): Promise<PhotoWithVotes[]> {
  return db
    .select({
      id: photos.id,
      url: photos.url,
      votes: sql<number>`count(${votes.id})::int`,
      hasVoted: voterId
        ? sql<boolean>`coalesce(bool_or(${votes.voterId} = ${voterId}), false)`
        : sql<boolean>`false`,
    })
    .from(photos)
    .leftJoin(votes, eq(votes.photoId, photos.id))
    .groupBy(photos.id)
    .orderBy(desc(photos.createdAt), desc(photos.id));
}
