import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, FileDown, Info } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { balanceToMonthlyIncome, currentSaver, projectBalance } from "@/lib/mock-data";

export const Route = createFileRoute("/app/projection")({
  component: ProjectionPage,
});

function ProjectionPage() {
  const { t, lang } = useI18n();
  const { format, rate, currency } = useCurrency();
  const [monthly, setMonthly] = useState(100); // USD
  const [retireAge, setRetireAge] = useState(currentSaver.retirementAge);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const years = Math.max(1, retireAge - currentSaver.age);

  const data = useMemo(() => {
    const cons = projectBalance(monthly, years, 0.04, currentSaver.balance);
    const exp = projectBalance(monthly, years, 0.055, currentSaver.balance);
    const opt = projectBalance(monthly, years, 0.075, currentSaver.balance);
    return cons.map((_, i) => ({
      year: currentSaver.age + i,
      conservative: cons[i],
      expected: exp[i],
      optimistic: opt[i],
    }));
  }, [monthly, years]);

  const finalConservative = data.at(-1)!.conservative;
  const finalExpected = data.at(-1)!.expected;
  const finalOptimistic = data.at(-1)!.optimistic;

  const incomeExp = balanceToMonthlyIncome(finalExpected);
  const incomeCons = balanceToMonthlyIncome(finalConservative);
  const incomeOpt = balanceToMonthlyIncome(finalOptimistic);

  // Cost of waiting scenarios
  const wait = (delayYears: number) =>
    balanceToMonthlyIncome(
      projectBalance(monthly, Math.max(1, years - delayYears), 0.055, currentSaver.balance).at(-1)!,
    );

  return (
    <div className="px-4 py-4">
      <div className="mb-3 flex items-center gap-2">
        <Link to="/app/home" className="rounded-full p-2 hover:bg-secondary">
          <ArrowLeft className="h-5 w-5 text-ink" />
        </Link>
        <h1 className="text-lg font-semibold tracking-tight text-ink">{t("proj.title")}</h1>
      </div>

      {/* Hero */}
      <div className="rounded-2xl border border-brand/20 bg-brand p-5 text-brand-foreground">
        <div className="h-1 w-12 rounded-full bg-accent" />
        <p className="mt-3 text-xs uppercase tracking-wider opacity-75">
          {lang === "es" ? `A los ${retireAge} recibirás ~` : `At ${retireAge} you'll receive ~`}
        </p>
        <p className="mt-1 text-4xl font-bold num">{format(incomeExp)}/{lang === "es" ? "mes" : "mo"}</p>
        <div className="mt-3">
          <div className="relative h-1.5 rounded-full bg-white/15">
            <div
              className="absolute h-full rounded-full bg-accent"
              style={{
                left: `${(incomeCons / incomeOpt) * 100 * 0.7}%`,
                right: "5%",
              }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] opacity-70 num">
            <span>{format(incomeCons)}</span>
            <span>{format(incomeOpt)}</span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="mt-4 space-y-4 rounded-xl border border-border bg-surface p-4">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-medium text-ink-muted">{t("proj.monthly")}</label>
            <span className="text-sm font-semibold text-ink num">{format(monthly)}</span>
          </div>
          <Slider
            value={[monthly * rate]}
            min={20 * rate}
            max={1000 * rate}
            step={5 * rate}
            onValueChange={(v) => setMonthly(v[0] / rate)}
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-medium text-ink-muted">{t("proj.age")}</label>
            <span className="text-sm font-semibold text-ink num">{retireAge}</span>
          </div>
          <Slider
            value={[retireAge]}
            min={55}
            max={75}
            step={1}
            onValueChange={(v) => setRetireAge(v[0])}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4 rounded-xl border border-border bg-surface p-3">
        <p className="px-1 pb-2 text-xs font-medium text-ink-muted">
          {lang === "es" ? "Acumulado por edad" : "Accumulated by age"} ({currency})
        </p>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="g-opt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="g-exp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="g-cons" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--brand)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--ink-muted)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--ink-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v) => format(v, { compact: true })} width={50} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12, background: "var(--surface)" }}
                formatter={(v: number) => format(v)}
                labelFormatter={(l) => (lang === "es" ? `Edad ${l}` : `Age ${l}`)}
              />
              <Area type="monotone" dataKey="optimistic" stroke="var(--accent)" fill="url(#g-opt)" strokeWidth={1.5} />
              <Area type="monotone" dataKey="expected" stroke="var(--accent)" fill="url(#g-exp)" strokeWidth={2} />
              <Area type="monotone" dataKey="conservative" stroke="var(--brand)" fill="url(#g-cons)" strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Assumptions */}
      <button
        onClick={() => setShowAssumptions((v) => !v)}
        className="mt-4 flex w-full items-center justify-between rounded-xl border border-border bg-surface p-4 text-left"
      >
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-brand" />
          <span className="text-sm font-medium text-ink">{t("proj.assumptions")}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-ink-muted transition-transform ${showAssumptions ? "rotate-180" : ""}`} />
      </button>
      {showAssumptions && (
        <div className="mt-2 rounded-xl border border-border bg-surface p-4 text-xs leading-relaxed text-ink-muted">
          <p>
            {lang === "es"
              ? "Rendimiento anual esperado: 5.5% • Inflación asumida: 3% • Fondos regulados de renta fija. Conservador 4%, optimista 7.5%. Retiro mensual usa la regla del 4%."
              : "Expected annual return: 5.5% • Assumed inflation: 3% • Regulated fixed-income funds. Conservative 4%, optimistic 7.5%. Monthly withdrawal uses the 4% safe-withdrawal rule."}
          </p>
        </div>
      )}

      {/* Scenarios */}
      <div className="mt-4">
        <p className="mb-2 px-1 text-xs font-medium text-ink-muted">{t("proj.scenarios")}</p>
        <div className="grid grid-cols-3 gap-2">
          <ScenarioChip label={t("proj.startToday")} value={format(incomeExp)} delta={null} highlight />
          <ScenarioChip label={t("proj.wait1")} value={format(wait(1))} delta={incomeExp - wait(1)} formatFn={format} />
          <ScenarioChip label={t("proj.wait5")} value={format(wait(5))} delta={incomeExp - wait(5)} formatFn={format} />
        </div>
      </div>

      <Button variant="outline" className="mt-4 w-full rounded-lg gap-2">
        <FileDown className="h-4 w-4" />
        {t("proj.share")}
      </Button>
    </div>
  );
}

function ScenarioChip({
  label,
  value,
  delta,
  highlight,
  formatFn,
}: {
  label: string;
  value: string;
  delta: number | null;
  highlight?: boolean;
  formatFn?: (n: number) => string;
}) {
  return (
    <div
      className={`rounded-xl border p-3 text-center ${
        highlight ? "border-brand bg-brand/5" : "border-border bg-surface"
      }`}
    >
      <p className="text-[10px] uppercase tracking-wider text-ink-muted">{label}</p>
      <p className="mt-1 text-sm font-bold text-ink num">{value}</p>
      {delta != null && delta > 0 && formatFn && (
        <p className="mt-0.5 text-[10px] font-medium text-destructive num">−{formatFn(delta)}</p>
      )}
    </div>
  );
}
