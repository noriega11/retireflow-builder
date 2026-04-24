import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { savers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/compliance")({
  component: Compliance,
});

function Compliance() {
  const { lang } = useI18n();
  const queue = savers.filter((s) => s.kyc === "pending" || s.kyc === "escalated").slice(0, 8);
  const [decisions, setDecisions] = useState<Record<string, "approved" | "rejected">>({});

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold tracking-tight text-ink">{lang === "es" ? "Cumplimiento" : "Compliance"}</h1>
      <div className="rounded-xl border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <p className="text-sm font-semibold text-ink">{lang === "es" ? "Cola de aprobación KYC" : "KYC approval queue"}</p>
          <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[11px] font-semibold text-warning">{queue.length} {lang === "es" ? "pendientes" : "pending"}</span>
        </div>
        <ul className="divide-y divide-border">
          {queue.map((s) => {
            const d = decisions[s.id];
            return (
              <li key={s.id} className="flex items-center gap-3 px-5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-ink">{s.name[0]}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">{s.name} <span className="ml-1 text-[10px] text-ink-muted">{s.id}</span></p>
                  <p className="text-[11px] text-ink-muted">{s.country} · risk: {s.churn}</p>
                </div>
                {s.kyc === "escalated" && <AlertCircle className="h-4 w-4 text-warning" />}
                {d ? (
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${d === "approved" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{d}</span>
                ) : (
                  <div className="flex gap-1.5">
                    <Button size="sm" variant="outline" className="h-8 gap-1 text-xs" onClick={() => setDecisions({ ...decisions, [s.id]: "rejected" })}>
                      <XCircle className="h-3.5 w-3.5 text-destructive" /> Reject
                    </Button>
                    <Button size="sm" className="h-8 gap-1 bg-success text-success-foreground text-xs hover:bg-success/90" onClick={() => setDecisions({ ...decisions, [s.id]: "approved" })}>
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                    </Button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
