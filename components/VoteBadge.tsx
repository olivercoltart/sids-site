export default function VoteBadge({ votes }: { votes: number }) {
  return (
    <span className="absolute left-2 top-2 z-10 rounded-full bg-black/70 px-2.5 py-1 text-sm font-semibold text-white backdrop-blur-sm">
      ♥ {votes}
    </span>
  );
}
