export default function MessagesPage() {
  return (
    <main className="min-h-screen bg-[color:var(--bg)] px-6 py-10 text-[color:var(--text)]">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-10 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
        <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">
          Messages
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[color:var(--text)]">
          Your inbox is ready.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)]">
          This is where employer messages will appear. For now, it’s a placeholder
          for future real-time chat and notifications.
        </p>
      </div>
    </main>
  );
}
