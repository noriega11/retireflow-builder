import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { savers } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/savers")({
  component: AdminSavers,
});

function AdminSavers() {
  const { lang } = useI18n();
  const { format } = useCurrency();
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold tracking-tight text-ink">{lang === "es" ? "Ahorradores" : "Savers"}</h1>
      <p className="text-sm text-ink-muted">{savers.length} {lang === "es" ? "registrados" : "registered"} · {savers.filter(s => s.kyc === "escalated").length} {lang === "es" ? "escalados" : "escalated"}</p>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">ID</th>
              <th className="px-4 py-2.5 text-left font-medium">{lang === "es" ? "Nombre" : "Name"}</th>
              <th className="px-4 py-2.5 text-left font-medium">Partner</th>
              <th className="px-4 py-2.5 text-left font-medium">KYC</th>
              <th className="px-4 py-2.5 text-right font-medium">{lang === "es" ? "Balance" : "Balance"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {savers.slice(0, 25).map((s) => (
              <tr key={s.id} className="hover:bg-secondary/30">
                <td className="px-4 py-3 font-mono text-xs text-ink-muted">{s.id}</td>
                <td className="px-4 py-3 font-medium text-ink">{s.name}</td>
                <td className="px-4 py-3 text-ink-muted">{s.partnerId}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${s.kyc === "approved" ? "bg-success/10 text-success" : s.kyc === "pending" ? "bg-warning/15 text-warning" : "bg-destructive/10 text-destructive"}`}>{s.kyc}</span></td>
                <td className="px-4 py-3 text-right num text-ink">{format(s.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
