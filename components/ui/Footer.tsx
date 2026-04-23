export function Footer() {
  return (
    <footer className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-center text-sm text-[color:var(--muted)]">
      <p>&copy; 2026 Local Jobs Marketplace. Built with trust in mind.</p>
      <p className="mt-2">
        <a href="mailto:support@kazilink.tz" className="text-[color:var(--accent)] hover:underline">
          Contact support
        </a>
      </p>
    </footer>
  );
}
