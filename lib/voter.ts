import { cookies } from "next/headers";

const COOKIE = "voter_id";

export async function getVoterId(): Promise<string | undefined> {
  return (await cookies()).get(COOKIE)?.value;
}

/** Only callable from a Server Action or Route Handler (sets a cookie). */
export async function getOrCreateVoterId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(COOKIE)?.value;
  if (existing) return existing;
  const id = crypto.randomUUID();
  store.set(COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return id;
}
