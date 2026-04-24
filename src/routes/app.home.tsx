import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Plus, Sparkles, TrendingUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { currentSaver, recentDeposits } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/home")({
  component: SaverHome,
});

function SaverHome() {
  const { t, lang } = useI18n();
  const { format } = useCurrency();
  const s = currentSaver;
  const goalPct = Math.min(100, Math.round((s.projected.expected / s.targetMonthlyIncome) * 100));

  return (
    <div className="space-y-4 px-4 py-5">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-ink-muted">{lang === "es" ? "Hola," : "Hi,"}</p>
          <p className="text-lg font-semibold tracking-tight text-ink">{s.name.split(" ")[0]}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
          M
        </div>
      </div>

      {/* Hero — projection */}
      <Link
        to="/app/projection"
        className="block overflow-hidden rounded-2xl border border-brand/20 bg-brand text-brand-foreground shadow-sm transition-transform hover:scale-[0.995]"
      >
        <div className="h-1 w-full bg-accent" />
        <div className="p-5">
          <p className="text-xs uppercase tracking-wider opacity-75">{t("home.heroLabel")}</p>
          <p className="mt-2 text-5xl font-bold tracking-tight num">
            {format(s.projected.expected)}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs opacity-80">
            <span className="num">
              {t("home.range")}: {format(s.projected.conservative)} – {format(s.projected.optimistic)}
            </span>
            <ChevronRight className="ml-auto h-4 w-4" />
          </div>
        </div>
      </Link>

      {/* Two-up cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-[11px] text-ink-muted">{t("home.balance")}</p>
          <p className="mt-1 text-xl font-bold text-ink num">{format(s.balance)}</p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-success">
            <TrendingUp className="h-3 w-3" />
            <span>+12% {lang === "es" ? "este mes" : "this month"}</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-[11px] text-ink-muted">{t("home.progress")}</p>
          <div className="mt-2 flex items-center gap-3">
            <ProgressRing pct={goalPct} />
            <div>
              <p className="text-xl font-bold text-ink num">{goalPct}%</p>
              <p className="text-[10px] text-ink-muted">
                {lang === "es" ? "de meta" : "of goal"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Next deposit */}
      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-ink-muted">{t("home.nextDeposit")}</p>
          <button className="text-xs font-medium text-brand">{t("home.change")}</button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-ink num">{format(25)}</p>
            <p className="text-xs text-ink-muted">
              {lang === "es" ? "Mañana · RappiPay •• 4821" : "Tomorrow · RappiPay •• 4821"}
            </p>
          </div>
          <div className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
            Auto
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-xl border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-sm font-semibold text-ink">{t("home.recent")}</p>
          <Link to="/app/activity" className="text-xs font-medium text-brand">
            {lang === "es" ? "Ver todo" : "See all"}
          </Link>
        </div>
        <ul className="divide-y divide-border">
          {recentDeposits.slice(0, 3).map((d) => (
            <li key={d.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/10 text-success">
                <Plus className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink num">{format(d.amount)}</p>
                <p className="text-[11px] text-ink-muted">{d.source}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-medium text-success num">
                  +{format(d.retirementIncomeAdded)}/{lang === "es" ? "mes" : "mo"}
                </p>
                <p className="text-[10px] text-ink-muted">
                  {new Date(d.date).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Education */}
      <div className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4">
        <Sparkles className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
        <div className="flex-1">
          <p className="text-sm font-medium text-ink">{t("home.tipTitle")}</p>
          <p className="mt-1 text-xs text-ink-muted">
            {lang === "es"
              ? "El interés compuesto premia el tiempo, no el monto. Aprende cómo."
              : "Compound interest rewards time, not size. Learn how."}
          </p>
        </div>
        <ArrowRight className="h-4 w-4 text-accent" />
      </div>

      {/* FAB */}
      <Button
        asChild
        className="fixed bottom-24 left-1/2 z-30 h-14 w-14 -translate-x-[calc(50%-180px)] rounded-full bg-accent p-0 text-accent-foreground shadow-lg hover:bg-accent/90 md:absolute md:bottom-32"
      >
        <Link to="/app/save" aria-label="Deposit">
          <Plus className="h-6 w-6" />
        </Link>
      </Button>
    </div>
  );
}

function ProgressRing({ pct }: { pct: number }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
      <circle cx="22" cy="22" r={r} fill="none" stroke="var(--secondary)" strokeWidth="4" />
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="4"
        strokeDasharray={c}
        strokeDashoffset={off}
        strokeLinecap="round"
      />
    </svg>
  );
}
