import type { ReactNode } from "react";

const ITEMS: ReactNode[] = [
  <>
    You can donate through the link below (this is done on a trust basis, so please don't be a nob):{" "}
    <a
      href="https://eventmaster.ie/fundraising/pages/SN97239725"
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
    >
      donate here
    </a>
  </>,
  "A minimum of £800 needs to be raised for me to get a tattoo",
  "It costs £30 per photo submission and £10 per vote",
  "Once donated, you can either submit a photo below, or vote by clicking a photo and selecting 'Vote'",
  "The photo with the most votes by the end of the countdown will be permanently added to my body in the form of a tattoo!",
];

export default function InfoList() {
  return (
    <section className="mx-auto max-w-xl">
      <ul className="list-disc space-y-1 pl-6">
        {ITEMS.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
