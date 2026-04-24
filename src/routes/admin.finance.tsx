import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { partners } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/finance")({
  component: Finance,
});

function Finance() {
  const { lang } = useI18n();
  const { format } = useCurrency();
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold tracking-tight text-ink">{lang === "es" ? "Finanzas" : "Finance"}</h1>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          { l: lang === "es" ? "AUM fees YTD" : "AUM fees YTD", v: format(124_300) },
          { l: lang === "es" ? "Revenue share pagado" : "Revenue share paid", v: format(38_400) },
          { l: lang === "es" ? "Costos operativos" : "Operating costs", v: format(58_200) },
        ].map((k) => (
          <div key={k.l} className="rounded-xl border border-border bg-surface p-4">
            <p className="text-xs text-ink-muted">{k.l}</p>
            <p className="mt-1 text-2xl font-bold text-ink num">{k.v}</p>
          </div>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">Partner</th>
              <th className="px-4 py-2.5 text-right font-medium">AUM</th>
              <th className="px-4 py-2.5 text-right font-medium">Fee MTD</th>
              <th className="px-4 py-2.5 text-right font-medium">Share owed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {partners.filter((p) => p.aum > 0).map((p) => {
              const fee = p.aum * 0.003 / 12;
              const share = fee * (p.revenueSharePct / 100);
              return (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium text-ink">{p.name}</td>
                  <td className="px-4 py-3 text-right num text-ink">{format(p.aum, { compact: true })}</td>
                  <td className="px-4 py-3 text-right num text-ink">{format(fee)}</td>
                  <td className="px-4 py-3 text-right num font-semibold text-accent">{format(share)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
