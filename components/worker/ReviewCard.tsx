type ReviewCardProps = {
  author: string;
  rating: number;
  text: string;
  date: string;
};

export function ReviewCard({ author, rating, text, date }: ReviewCardProps) {
  return (
    <article className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-[color:var(--text)]">{author}</p>
          <p className="text-sm text-[color:var(--muted)]">{date}</p>
        </div>
        <span className="rounded-full bg-[color:var(--accent)]/15 px-3 py-1 text-sm font-semibold text-[color:var(--accent)]">
          {rating.toFixed(1)} ⭐
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-[color:var(--text)]">{text}</p>
    </article>
  );
}
