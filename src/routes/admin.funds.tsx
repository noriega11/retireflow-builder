import { createFileRoute } from "@tanstack/react-router";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { funds } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/funds")({
  component: FundsPage,
});

const COLORS = ["var(--brand)", "var(--accent)", "var(--success)", "var(--warning)"];

function FundsPage() {
  const { lang } = useI18n();
  const { format } = useCurrency();
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold tracking-tight text-ink">{lang === "es" ? "Fondos" : "Funds"}</h1>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5">
          <h3 className="text-sm font-semibold text-ink">{lang === "es" ? "Asignación" : "Allocation"}</h3>
          <div className="mt-3 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={funds} dataKey="allocationPct" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {funds.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12, background: "var(--surface)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 space-y-1 text-xs">
            {funds.map((f, i) => (
              <li key={f.id} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="flex-1 truncate text-ink">{f.name}</span>
                <span className="num font-semibold text-ink">{f.allocationPct}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-success/30 bg-success/5 p-5 lg:col-span-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <p className="text-sm font-semibold text-ink">{lang === "es" ? "Reconciliación" : "Reconciliation"}</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
            <Box label={lang === "es" ? "Custodia" : "Custody"} value={format(10_000_000)} />
            <Box label={lang === "es" ? "Plataforma" : "Platform"} value={format(10_000_000)} />
            <Box label={lang === "es" ? "Diferencia" : "Difference"} value={format(0)} />
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">{lang === "es" ? "Fondo" : "Fund"}</th>
              <th className="px-4 py-2.5 text-left font-medium">{lang === "es" ? "Custodio" : "Custodian"}</th>
              <th className="px-4 py-2.5 text-right font-medium">Yield</th>
              <th className="px-4 py-2.5 text-right font-medium">Duration</th>
              <th className="px-4 py-2.5 text-right font-medium">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {funds.map((f) => (
              <tr key={f.id}>
                <td className="px-4 py-3 font-medium text-ink">{f.name}</td>
                <td className="px-4 py-3 text-ink-muted">{f.custodian}</td>
                <td className="px-4 py-3 text-right num text-success font-semibold">{f.yieldPct}%</td>
                <td className="px-4 py-3 text-right num text-ink">{f.durationYears}y</td>
                <td className="px-4 py-3 text-right num text-ink">{format(f.balance, { compact: true })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface p-3">
      <p className="text-[10px] uppercase text-ink-muted">{label}</p>
      <p className="mt-1 text-base font-bold text-ink num">{value}</p>
    </div>
  );
}
