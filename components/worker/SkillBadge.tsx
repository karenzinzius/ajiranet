type SkillBadgeProps = {
  label: string;
};

export function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-1 text-xs font-medium text-[color:var(--text)]">
      {label}
    </span>
  );
}