import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";

export const Route = createFileRoute("/partner/revenue")({
  component: Revenue,
});

function Revenue() {
  const { lang } = useI18n();
  const { format } = useCurrency();
  const months = ["Apr 25", "Mar 25", "Feb 25", "Jan 25", "Dec 24", "Nov 24"];
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">{lang === "es" ? "Ingresos" : "Revenue"}</h1>
        <p className="mt-1 text-sm text-ink-muted">{lang === "es" ? "Estados mensuales y próximos pagos" : "Monthly statements and upcoming payouts"}</p>
      </div>
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
        <p className="text-xs text-ink-muted">{lang === "es" ? "Próximo pago" : "Next payout"}</p>
        <p className="mt-1 text-3xl font-bold text-ink num">{format(12_840)}</p>
        <p className="mt-1 text-xs text-ink-muted">May 1, 2025 · ACH</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">{lang === "es" ? "Mes" : "Month"}</th>
              <th className="px-4 py-2.5 text-right font-medium">AUM</th>
              <th className="px-4 py-2.5 text-right font-medium">Fee</th>
              <th className="px-4 py-2.5 text-right font-medium">Share (30%)</th>
              <th className="px-4 py-2.5 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {months.map((m, i) => {
              const aum = 4_200_000 - i * 280_000;
              const fee = aum * 0.003 / 12;
              const share = fee * 0.3;
              return (
                <tr key={m}>
                  <td className="px-4 py-3 text-ink">{m}</td>
                  <td className="px-4 py-3 text-right num text-ink">{format(aum)}</td>
                  <td className="px-4 py-3 text-right num text-ink-muted">{format(fee)}</td>
                  <td className="px-4 py-3 text-right num font-semibold text-ink">{format(share)}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">PAID</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
