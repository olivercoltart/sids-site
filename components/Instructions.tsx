// Placeholder copy — replace with your instructions.
// Each string in the array becomes its own paragraph.
const PARAGRAPHS = [
  "Welcome! In an attempt to raise money for charity, I will be getting a tattoo of the submission with the most votes.", 
  "Instructions:",
];

export default function Instructions() {
  return (
    <section className="mx-auto max-w-2xl space-y-3 text-center text-lg leading-relaxed">
      {PARAGRAPHS.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </section>
  );
}
