import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { savers, partners } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/partner/savers")({
  component: PartnerSavers,
});

function PartnerSavers() {
  const { lang } = useI18n();
  const { format } = useCurrency();
  const [q, setQ] = useState("");
  const [reveal, setReveal] = useState(false);
  const list = savers
    .filter((s) => s.partnerId === "p1")
    .filter((s) => !q || s.name.toLowerCase().includes(q.toLowerCase()) || s.id.includes(q));

  const mask = (n: string) => {
    const [a, b] = n.split(" ");
    return `${a[0]}. ${b}`;
  };

  const churnTone: Record<string, string> = {
    low: "bg-success/10 text-success",
    med: "bg-warning/15 text-warning",
    high: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          {lang === "es" ? "Ahorradores" : "Savers"}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {savers.filter((s) => s.partnerId === "p1").length} {lang === "es" ? "totales" : "total"} · {partners[0].name}
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={lang === "es" ? "Buscar por nombre o ID" : "Search by name or ID"}
            className="h-9 pl-9"
          />
        </div>
        <button
          onClick={() => setReveal((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-ink"
        >
          <Eye className="h-3.5 w-3.5" />
          {reveal ? (lang === "es" ? "Enmascarar" : "Mask") : (lang === "es" ? "Mostrar nombres" : "Reveal names")}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">{lang === "es" ? "Nombre" : "Name"}</th>
              <th className="px-4 py-2.5 text-left font-medium">KYC</th>
              <th className="px-4 py-2.5 text-right font-medium">{lang === "es" ? "Balance" : "Balance"}</th>
              <th className="px-4 py-2.5 text-left font-medium">{lang === "es" ? "Cadencia" : "Cadence"}</th>
              <th className="px-4 py-2.5 text-left font-medium">{lang === "es" ? "Último depósito" : "Last deposit"}</th>
              <th className="px-4 py-2.5 text-left font-medium">{lang === "es" ? "Riesgo" : "Risk"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.slice(0, 30).map((s) => (
              <tr key={s.id} className="hover:bg-secondary/30">
                <td className="px-4 py-2.5 font-medium text-ink">{reveal ? s.name : mask(s.name)}</td>
                <td className="px-4 py-2.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    s.kyc === "approved" ? "bg-success/10 text-success" :
                    s.kyc === "pending" ? "bg-warning/15 text-warning" :
                    "bg-destructive/10 text-destructive"
                  }`}>{s.kyc}</span>
                </td>
                <td className="px-4 py-2.5 text-right num text-ink">{format(s.balance)}</td>
                <td className="px-4 py-2.5 text-xs text-ink-muted">{s.cadence}</td>
                <td className="px-4 py-2.5 text-xs text-ink-muted">
                  {new Date(s.lastDeposit).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" })}
                </td>
                <td className="px-4 py-2.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${churnTone[s.churn]}`}>
                    {s.churn}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
