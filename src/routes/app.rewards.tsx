import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Flame, Lock, Sparkles, Trophy, Zap } from "lucide-react";
import { useGame } from "@/lib/game";
import { LevelCard, StreakBanner } from "@/components/Gamification";

export const Route = createFileRoute("/app/rewards")({
  component: Rewards,
});

function Rewards() {
  const { quests, badges, totalDeposits } = useGame();
  const earned = badges.filter((b) => b.earned);
  const locked = badges.filter((b) => !b.earned);

  return (
    <div className="space-y-4 px-4 py-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Rewards</h1>
        <p className="mt-0.5 text-xs text-ink-muted">
          Saving consistently unlocks levels, badges and XP.
        </p>
      </div>

      <LevelCard />
      <StreakBanner />

      {/* Stat strip */}
      <div className="grid grid-cols-3 gap-2">
        <Stat icon={Trophy} value={earned.length} label="Badges" tone="brand" />
        <Stat icon={Flame} value={totalDeposits} label="Deposits" tone="gold" />
        <Stat icon={Zap} value={`${quests.filter((q) => q.done).length}/${quests.length}`} label="Quests" tone="mint" />
      </div>

      {/* Weekly quests */}
      <section>
        <div className="mb-2 flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-ink">This week's quests</h2>
          <span className="text-[11px] text-ink-muted">Resets in 3d 4h</span>
        </div>
        <ul className="space-y-2">
          {quests.map((q) => {
            const pct = Math.round((q.progress / q.goal) * 100);
            return (
              <li
                key={q.id}
                className={`flex items-center gap-3 rounded-2xl border bg-surface p-3 ${
                  q.done ? "border-success/40 bg-success/5" : "border-border"
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${
                    q.done ? "bg-gradient-mint" : "bg-secondary"
                  }`}
                >
                  {q.done ? <Check className="h-5 w-5 text-success-foreground" strokeWidth={3} /> : q.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{q.label}</p>
                  <p className="text-[11px] text-ink-muted">{q.description}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full transition-all ${q.done ? "bg-success" : "bg-gradient-brand"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-ink-muted num">
                      {q.progress}/{q.goal}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 rounded-full bg-gradient-reward px-2.5 py-1 text-[11px] font-bold text-gold-foreground">
                  +{q.rewardXp} XP
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Badges */}
      <section>
        <div className="mb-2 flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-ink">Badges</h2>
          <span className="text-[11px] text-ink-muted">
            {earned.length}/{badges.length} earned
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[...earned, ...locked].map((b) => (
            <div
              key={b.id}
              className={`flex flex-col items-center rounded-2xl border p-3 text-center transition-all ${
                b.earned
                  ? "border-brand/15 bg-surface shadow-sm"
                  : "border-dashed border-border bg-secondary/40"
              }`}
            >
              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${
                  b.earned ? "bg-gradient-brand shadow-elevated" : "bg-secondary"
                }`}
              >
                <span className={b.earned ? "" : "opacity-30 grayscale"}>{b.emoji}</span>
                {!b.earned && (
                  <Lock className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-surface p-0.5 text-ink-muted" />
                )}
              </div>
              <p className={`mt-2 text-[11px] font-semibold ${b.earned ? "text-ink" : "text-ink-muted"}`}>
                {b.label}
              </p>
              <p className="mt-0.5 text-[10px] text-ink-muted leading-tight">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <Link
        to="/app/projection"
        className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4"
      >
        <Sparkles className="h-5 w-5 shrink-0 text-accent" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-ink">Level up your future</p>
          <p className="text-[11px] text-ink-muted">See how each level changes your retirement income.</p>
        </div>
      </Link>
    </div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number | string;
  label: string;
  tone: "brand" | "gold" | "mint";
}) {
  const bg = tone === "gold" ? "bg-gradient-reward" : tone === "mint" ? "bg-gradient-mint" : "bg-gradient-brand";
  const fg = tone === "gold" ? "text-gold-foreground" : tone === "mint" ? "text-success-foreground" : "text-brand-foreground";
  return (
    <div className="rounded-2xl border border-border bg-surface p-3">
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${bg} ${fg}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-2 text-xl font-bold text-ink num">{value}</p>
      <p className="text-[10px] text-ink-muted">{label}</p>
    </div>
  );
}
