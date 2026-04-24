import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertTriangle, ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { aumSeries, partners, savers } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/pulse")({
  component: Pulse,
});

function Pulse() {
  const { lang } = useI18n();
  const { format } = useCurrency();
  const data = aumSeries();
  const totalAum = partners.reduce((a, p) => a + p.aum, 0);

  const kpis = [
    { label: lang === "es" ? "AUM total" : "Total AUM", value: format(totalAum, { compact: true }) },
    { label: lang === "es" ? "Ahorradores" : "Savers", value: savers.length.toLocaleString() },
    { label: lang === "es" ? "Socios" : "Partners", value: partners.filter((p) => p.stage === "Live").length },
    { label: lang === "es" ? "Nuevos 30d" : "New 30d", value: "+312" },
    { label: lang === "es" ? "Run-rate" : "Run-rate", value: format(2_400_000, { compact: true }) + "/y" },
    { label: lang === "es" ? "Sistema" : "System", value: "Healthy", tone: "success" },
  ];

  const topAum = [...partners].filter(p => p.aum > 0).sort((a, b) => b.aum - a.aum).slice(0, 5);
  const anomalies = [
    { text: lang === "es" ? "PicPay: depósitos −18% WoW" : "PicPay: deposits −18% WoW", tone: "warn" },
    { text: lang === "es" ? "5 KYC escalados sin resolver >48h" : "5 escalated KYC unresolved >48h", tone: "warn" },
    { text: lang === "es" ? "Reconciliación de custodia OK" : "Custody reconciliation OK", tone: "ok" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          {lang === "es" ? "Pulso de la plataforma" : "Platform pulse"}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {lang === "es" ? "Visión en tiempo real" : "Real-time view"}
        </p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-border bg-surface p-3">
            <p className="text-[10px] uppercase tracking-wider text-ink-muted">{k.label}</p>
            <div className="mt-1 flex items-center gap-1.5">
              {k.tone === "success" && <span className="h-2 w-2 rounded-full bg-success animate-pulse" />}
              <p className="text-lg font-bold text-ink num">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-ink">
            {lang === "es" ? "AUM por socio (18m)" : "AUM by partner (18m)"}
          </h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--ink-muted)" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => format(v, { compact: true })} tick={{ fontSize: 10, fill: "var(--ink-muted)" }} axisLine={false} tickLine={false} width={50} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12, background: "var(--surface)" }} formatter={(v: number) => format(v)} />
                <Area type="monotone" dataKey="p1" stackId="1" stroke="var(--brand)" fill="var(--brand)" fillOpacity={0.7} name="RappiPay" />
                <Area type="monotone" dataKey="p2" stackId="1" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.7} name="Nequi" />
                <Area type="monotone" dataKey="p3" stackId="1" stroke="var(--success)" fill="var(--success)" fillOpacity={0.7} name="PicPay" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="mb-3 text-sm font-semibold text-ink">{lang === "es" ? "Top socios por AUM" : "Top partners by AUM"}</h3>
            <ul className="space-y-2">
              {topAum.map((p, i) => (
                <li key={p.id} className="flex items-center gap-2 text-sm">
                  <span className="w-4 text-xs font-bold text-ink-muted">{i + 1}</span>
                  <span className="flex-1 font-medium text-ink">{p.name}</span>
                  <span className="num text-xs font-semibold text-ink">{format(p.aum, { compact: true })}</span>
                  <span className="inline-flex items-center text-[10px] text-success"><ArrowUpRight className="h-3 w-3" /></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="mb-3 text-sm font-semibold text-ink">{lang === "es" ? "Anomalías" : "Anomalies"}</h3>
            <ul className="space-y-2 text-xs">
              {anomalies.map((a, i) => (
                <li key={i} className="flex items-start gap-2">
                  {a.tone === "warn" ? <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-warning" /> : <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />}
                  <span className="text-ink">{a.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="mb-3 text-sm font-semibold text-ink">{lang === "es" ? "Eventos relevantes" : "High-value events"}</h3>
        <ul className="space-y-2 text-sm">
          {[
            { t: lang === "es" ? "PicPay pasó a Live" : "PicPay went Live", at: "2h" },
            { t: lang === "es" ? "Depósito de $2,400 (RappiPay)" : "$2,400 deposit (RappiPay)", at: "4h" },
            { t: lang === "es" ? "KYC escalado resuelto" : "Escalated KYC resolved", at: "6h" },
          ].map((e, i) => (
            <li key={i} className="flex items-center gap-2 border-b border-border pb-2 last:border-0">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="flex-1 text-ink">{e.t}</span>
              <span className="text-xs text-ink-muted">{e.at}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
