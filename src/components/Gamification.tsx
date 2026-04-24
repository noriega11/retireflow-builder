import { Flame, Trophy } from "lucide-react";
import { useGame } from "@/lib/game";

/** Compact streak + level chip for headers */
export function StreakChip() {
  const { streak, level, levelTitle } = useGame();
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-1 rounded-full bg-gradient-reward px-2.5 py-1 text-[11px] font-bold text-gold-foreground shadow-sm">
        <Flame className="h-3 w-3 fill-current" strokeWidth={2.5} />
        <span className="num">{streak}</span>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-bold text-brand">
        <Trophy className="h-3 w-3" strokeWidth={2.5} />
        <span>L{level} · {levelTitle}</span>
      </div>
    </div>
  );
}

/** Big level + XP card */
export function LevelCard() {
  const { level, levelTitle, xpInLevel, xpToNext, xp } = useGame();
  const pct = Math.min(100, Math.round((xpInLevel / xpToNext) * 100));
  return (
    <div className="overflow-hidden rounded-2xl border border-brand/15 bg-surface shadow-sm">
      <div className="flex items-center gap-3 p-4">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-brand-foreground shadow-elevated">
          <Trophy className="h-6 w-6" strokeWidth={2.25} />
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-reward text-[10px] font-black text-gold-foreground ring-2 ring-surface num">
            {level}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5">
            <p className="text-sm font-bold text-ink">{levelTitle}</p>
            <p className="text-[11px] text-ink-muted num">· {xp.toLocaleString()} XP</p>
          </div>
          <div className="mt-1.5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-mint transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-1 text-[10px] text-ink-muted num">
              {xpInLevel} / {xpToNext} XP to L{level + 1}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Streak banner with calendar dots */
export function StreakBanner() {
  const { streak, bestStreak } = useGame();
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const today = 4; // Friday-ish
  const filled = Math.min(streak, 7);
  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-reward p-4 text-gold-foreground shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <Flame className="h-5 w-5 fill-current" />
            <span className="text-2xl font-black num">{streak}</span>
            <span className="text-sm font-semibold opacity-80">day streak</span>
          </div>
          <p className="mt-0.5 text-[11px] opacity-75">Best: {bestStreak} days · Keep it lit!</p>
        </div>
        <div className="flex gap-1">
          {days.map((d, i) => {
            const isFilled = i <= today && i < filled;
            const isToday = i === today;
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-[9px] font-bold opacity-70">{d}</span>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-all ${
                    isFilled
                      ? "border-white bg-white/30 text-white"
                      : "border-white/30 text-white/50"
                  } ${isToday ? "animate-ring-glow" : ""}`}
                >
                  {isFilled ? "✓" : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
