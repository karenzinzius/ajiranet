// Updated definition in components/ui/EscrowStatus.tsx
export function EscrowStatus({ 
  status, 
  amount 
}: { 
  status: 'secured' | 'pending_release' | 'released' | 'disputed', 
  amount?: string 
}) {
  return (
    <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">
            Escrow Status
          </p>
          {/* Only render the amount if it exists */}
          {amount && (
            <h3 className="text-lg font-bold text-[color:var(--text)]">{amount} TZS</h3>
          )}
        </div>
        
        {/* Visual Badge logic stays the same */}
        <div className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold ${
          status === 'secured' ? 'bg-blue-500/10 text-blue-400' : 
          status === 'released' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
        }`}>
          <div className={`h-2 w-2 rounded-full animate-pulse ${
            status === 'secured' ? 'bg-blue-400' : 
            status === 'released' ? 'bg-green-400' : 'bg-amber-400'
          }`} />
          {status.toUpperCase().replace('_', ' ')}
        </div>
      </div>

      {/* Action Buttons logic stays the same */}
      {status === 'pending_release' ? (
        <div className="space-y-3">
          <button className="w-full rounded-2xl bg-[color:var(--accent)] py-3 text-sm font-bold text-slate-950 hover:opacity-90 transition">
            Confirm & Release Payment
          </button>
          <button className="w-full text-xs font-medium text-red-400 hover:underline">
            Something is wrong? Open a Dispute
          </button>
        </div>
      ) : (
        <p className="text-sm text-[color:var(--muted)]">
          {status === 'secured' ? "Money is held safely. Release it once the job is finished." : "This transaction is complete."}
        </p>
      )}
    </div>
  );
}