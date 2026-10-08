"use client";

import { useActionState, useEffect, useRef } from "react";
import { uploadPhoto, type UploadState } from "@/app/actions";

export default function UploadForm() {
  const [state, action, pending] = useActionState<UploadState, FormData>(uploadPhoto, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={action}
      className="mx-auto flex max-w-xl flex-col items-center gap-3 sm:flex-row sm:flex-wrap"
    >
      <input
        type="file"
        name="photo"
        accept="image/*"
        required
        className="w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-foreground/10 file:px-3 file:py-2 file:text-foreground file:cursor-pointer file:transition-colors file:hover:bg-foreground/20"
      />
      <button
        type="submit"
        disabled={pending}
        className="w-full shrink-0 rounded-md bg-foreground px-4 py-2 font-medium text-background cursor-pointer transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {pending ? "Uploading…" : "Submit photo"}
      </button>
      {state.error && (
        <p role="alert" className="text-sm text-red-500 sm:basis-full">
          {state.error}
        </p>
      )}
    </form>
  );
}
