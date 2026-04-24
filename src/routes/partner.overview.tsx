import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownRight, ArrowUpRight, Calendar, TrendingUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { aumSeries } from "@/lib/mock-data";

export const Route = createFileRoute("/partner/overview")({
  component: PartnerOverview,
});

function PartnerOverview() {
  const { lang } = useI18n();
  const { format } = useCurrency();
  const data = aumSeries();

  const kpis = [
    { label: lang === "es" ? "Ahorradores activos" : "Active savers", value: "78", delta: "+12.4%", positive: true, spark: data.map((d) => ({ v: d.aum / 100000 })) },
    { label: "AUM", value: format(4_820_000, { compact: true }), delta: "+8.7%", positive: true, spark: data.map((d) => ({ v: d.aum / 1000 })) },
    { label: lang === "es" ? "Depósitos MTD" : "MTD deposits", value: format(142_300, { compact: true }), delta: "+3.2%", positive: true, spark: data.map((d) => ({ v: d.deposits / 1000 })) },
    { label: lang === "es" ? "Revenue share acumulado" : "Accrued rev share", value: format(38_450, { compact: true }), delta: "−1.1%", positive: false, spark: data.map((d) => ({ v: d.aum / 200000 })) },
  ];

  const funnel = [
    { stage: lang === "es" ? "Invitados" : "Invited", n: 1240, pct: 100 },
    { stage: lang === "es" ? "Inició KYC" : "Started KYC", n: 612, pct: 49 },
    { stage: lang === "es" ? "Completó KYC" : "KYC done", n: 421, pct: 34 },
    { stage: lang === "es" ? "1er depósito" : "First deposit", n: 312, pct: 25 },
    { stage: lang === "es" ? "Activo 30d" : "Active 30d", n: 248, pct: 20 },
    { stage: lang === "es" ? "Activo 90d" : "Active 90d", n: 197, pct: 16 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">
            {lang === "es" ? "Hola, RappiPay" : "Hi, RappiPay"}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {lang === "es" ? "Resumen del programa" : "Program snapshot"}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs">
          <Calendar className="h-3.5 w-3.5 text-ink-muted" />
          <span className="font-medium text-ink">30d</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-border bg-surface p-4">
            <p className="text-[11px] text-ink-muted">{k.label}</p>
            <p className="mt-1 text-2xl font-bold text-ink num">{k.value}</p>
            <div className="flex items-center justify-between">
              <span className={`flex items-center gap-0.5 text-xs font-medium ${k.positive ? "text-success" : "text-destructive"}`}>
                {k.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {k.delta}
              </span>
              <div className="h-6 w-16">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={k.spark}>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={k.positive ? "var(--success)" : "var(--destructive)"}
                      fill={k.positive ? "var(--success)" : "var(--destructive)"}
                      fillOpacity={0.18}
                      strokeWidth={1.5}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Chart */}
        <div className="rounded-xl border border-border bg-surface p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink">
              {lang === "es" ? "Crecimiento de AUM (18 meses)" : "AUM growth (18 months)"}
            </h3>
            <div className="flex items-center gap-1 text-xs text-success">
              <TrendingUp className="h-3.5 w-3.5" />
              +502%
            </div>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="aum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--ink-muted)" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => format(v, { compact: true })} tick={{ fontSize: 10, fill: "var(--ink-muted)" }} axisLine={false} tickLine={false} width={50} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12, background: "var(--surface)" }}
                  formatter={(v: number) => format(v)}
                />
                <Area type="monotone" dataKey="aum" stroke="var(--brand)" fill="url(#aum)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Next payout */}
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
          <p className="text-xs text-ink-muted">
            {lang === "es" ? "Próxima revenue share" : "Next revenue share"}
          </p>
          <p className="mt-1 text-3xl font-bold text-ink num">{format(12_840, { compact: false })}</p>
          <p className="mt-1 text-xs text-ink-muted">
            {lang === "es" ? "Pago el 1 de Mayo" : "Paid May 1"}
          </p>
          <div className="mt-4 space-y-1.5 border-t border-accent/20 pt-4 text-xs">
            <Row label={lang === "es" ? "AUM fee (0.30%)" : "AUM fee (0.30%)"} value={format(11_200)} />
            <Row label={lang === "es" ? "Bonus crecimiento" : "Growth bonus"} value={format(1_640)} />
            <Row label={lang === "es" ? "Revenue share (30%)" : "Revenue share (30%)"} value={format(12_840)} bold />
          </div>
        </div>
      </div>

      {/* Funnel */}
      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="text-sm font-semibold text-ink">
          {lang === "es" ? "Embudo de conversión" : "Conversion funnel"}
        </h3>
        <div className="mt-4 space-y-2.5">
          {funnel.map((f, i) => {
            const lowConv = i > 0 && (f.n / funnel[i - 1].n) < 0.4;
            return (
              <div key={f.stage} className="flex items-center gap-3">
                <div className="w-32 shrink-0 text-xs text-ink-muted">{f.stage}</div>
                <div className="relative h-7 flex-1 rounded-md bg-secondary">
                  <div
                    className={`h-full rounded-md ${lowConv ? "bg-warning" : "bg-brand"}`}
                    style={{ width: `${f.pct}%` }}
                  />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand-foreground mix-blend-difference">
                    {f.n.toLocaleString()}
                  </span>
                </div>
                <div className="w-12 text-right text-xs font-semibold text-ink num">{f.pct}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cohort */}
      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="text-sm font-semibold text-ink">
          {lang === "es" ? "Retención por cohorte" : "Cohort retention"}
        </h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-ink-muted">
                <th className="px-2 py-1 text-left font-medium">Cohort</th>
                {[0, 1, 2, 3, 4, 5].map((m) => (
                  <th key={m} className="px-1 py-1 text-center font-medium">M{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {["Nov 23", "Dec 23", "Jan 24", "Feb 24", "Mar 24", "Apr 24"].map((c, ci) => (
                <tr key={c}>
                  <td className="px-2 py-1 text-ink-muted">{c}</td>
                  {[100, 88, 76, 70, 64, 58].slice(0, 6 - ci).map((v, i) => {
                    const opacity = v / 100;
                    return (
                      <td key={i} className="px-1 py-1">
                        <div
                          className="flex h-7 items-center justify-center rounded text-[10px] font-semibold"
                          style={{
                            backgroundColor: `color-mix(in oklab, var(--brand) ${v}%, transparent)`,
                            color: opacity > 0.5 ? "white" : "var(--ink)",
                          }}
                        >
                          {v}%
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly deposits */}
      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="text-sm font-semibold text-ink">
          {lang === "es" ? "Depósitos mensuales" : "Monthly deposits"}
        </h3>
        <div className="mt-4 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--ink-muted)" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => format(v, { compact: true })} tick={{ fontSize: 10, fill: "var(--ink-muted)" }} axisLine={false} tickLine={false} width={50} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12, background: "var(--surface)" }} formatter={(v: number) => format(v)} />
              <Bar dataKey="deposits" fill="var(--accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-ink-muted">{label}</span>
      <span className={`num ${bold ? "font-semibold text-ink" : "text-ink"}`}>{value}</span>
    </div>
  );
}
