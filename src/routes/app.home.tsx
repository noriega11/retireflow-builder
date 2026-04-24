import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Plus, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { currentSaver, recentDeposits } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useGame } from "@/lib/game";
import { StreakChip } from "@/components/Gamification";

export const Route = createFileRoute("/app/home")({
  component: SaverHome,
});

function SaverHome() {
  const { t, lang } = useI18n();
  const { format } = useCurrency();
  const { quests, level, levelTitle, xpInLevel, xpToNext } = useGame();
  const s = currentSaver;
  const goalPct = Math.min(100, Math.round((s.projected.expected / s.targetMonthlyIncome) * 100));
  const xpPct = Math.min(100, Math.round((xpInLevel / xpToNext) * 100));
  const activeQuest = quests.find((q) => !q.done) ?? quests[0];

  return (
    <div className="space-y-4 px-4 py-4">
      {/* Greeting + level/streak */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-ink-muted">{lang === "es" ? "Hola," : "Hey,"}</p>
          <p className="text-lg font-bold tracking-tight text-ink">{s.name.split(" ")[0]} 👋</p>
        </div>
        <StreakChip />
      </div>

      {/* Hero — projection (gradient) */}
      <Link
        to="/app/projection"
        className="block overflow-hidden rounded-3xl bg-gradient-hero text-brand-foreground shadow-elevated transition-transform hover:scale-[0.995]"
      >
        <div className="relative p-5">
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-12 translate-x-12 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative">
            <p className="text-[11px] uppercase tracking-wider opacity-75">{t("home.heroLabel")}</p>
            <p className="mt-2 text-5xl font-black tracking-tight num">
              {format(s.projected.expected)}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] opacity-80">
              <span className="num">
                {format(s.projected.conservative)} – {format(s.projected.optimistic)}/{lang === "es" ? "mes" : "mo"}
              </span>
              <ChevronRight className="ml-auto h-4 w-4" />
            </div>
            {/* XP bar inside hero */}
            <div className="mt-4 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold">L{level} · {levelTitle}</span>
                <span className="opacity-80 num">{xpInLevel}/{xpToNext} XP</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/20">
                <div className="h-full rounded-full bg-gradient-mint transition-all duration-500" style={{ width: `${xpPct}%` }} />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Two-up cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-surface p-4">
          <p className="text-[11px] text-ink-muted">{t("home.balance")}</p>
          <p className="mt-1 text-2xl font-bold text-ink num">{format(s.balance)}</p>
          <div className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-success">
            <TrendingUp className="h-3 w-3" />
            <span>+12% {lang === "es" ? "este mes" : "this month"}</span>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-4">
          <p className="text-[11px] text-ink-muted">{t("home.progress")}</p>
          <div className="mt-1.5 flex items-center gap-3">
            <ProgressRing pct={goalPct} />
            <div>
              <p className="text-2xl font-bold text-ink num">{goalPct}%</p>
              <p className="text-[10px] text-ink-muted">
                {lang === "es" ? "de meta" : "of goal"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active quest */}
      <Link
        to="/app/rewards"
        className="block rounded-2xl border border-accent/40 bg-gradient-mint/10 p-4 transition-all hover:border-accent"
        style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--accent) 12%, white) 0%, color-mix(in oklab, var(--brand) 6%, white) 100%)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-xl shadow-sm">
            {activeQuest.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-accent" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Active quest</p>
            </div>
            <p className="text-sm font-bold text-ink">{activeQuest.label}</p>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/60">
                <div
                  className="h-full rounded-full bg-gradient-brand transition-all"
                  style={{ width: `${(activeQuest.progress / activeQuest.goal) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold text-ink-muted num">
                {activeQuest.progress}/{activeQuest.goal}
              </span>
            </div>
          </div>
          <div className="shrink-0 rounded-full bg-gradient-reward px-2 py-0.5 text-[10px] font-bold text-gold-foreground">
            +{activeQuest.rewardXp} XP
          </div>
        </div>
      </Link>

      {/* Next deposit */}
      <div className="rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-ink-muted">{t("home.nextDeposit")}</p>
          <button className="text-xs font-semibold text-brand">{t("home.change")}</button>
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-ink num">{format(25)}</p>
            <p className="text-[11px] text-ink-muted">
              {lang === "es" ? "Mañana · RappiPay •• 4821" : "Tomorrow · RappiPay •• 4821"}
            </p>
          </div>
          <div className="rounded-full bg-accent/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-success">
            Auto
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-2xl border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-sm font-bold text-ink">{t("home.recent")}</p>
          <Link to="/app/rewards" className="text-xs font-semibold text-brand">
            {lang === "es" ? "Ver todo" : "See all"}
          </Link>
        </div>
        <ul className="divide-y divide-border">
          {recentDeposits.slice(0, 3).map((d) => (
            <li key={d.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-mint text-success-foreground">
                <Plus className="h-4 w-4" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink num">{format(d.amount)}</p>
                <p className="text-[11px] text-ink-muted truncate">{d.source}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold text-success num">
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
      <div className="flex items-start gap-3 rounded-2xl border border-brand/15 bg-brand/5 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground">
          <Sparkles className="h-4 w-4" strokeWidth={2} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-ink">{t("home.tipTitle")}</p>
          <p className="mt-0.5 text-[11px] text-ink-muted">
            {lang === "es"
              ? "El interés compuesto premia el tiempo, no el monto."
              : "Compound interest rewards time, not size. Tap to learn."}
          </p>
        </div>
        <ArrowRight className="h-4 w-4 self-center text-brand" />
      </div>

      {/* FAB */}
      <Button
        asChild
        className="fixed bottom-24 left-1/2 z-30 h-14 w-14 -translate-x-[calc(50%-180px)] rounded-full bg-gradient-brand p-0 text-brand-foreground shadow-glow hover:opacity-95 md:absolute md:bottom-32"
      >
        <Link to="/app/save" aria-label="Deposit">
          <Plus className="h-6 w-6" strokeWidth={2.5} />
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
