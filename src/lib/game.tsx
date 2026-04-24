import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type BadgeId =
  | "first_deposit"
  | "week_streak"
  | "month_streak"
  | "round_up_hero"
  | "auto_pilot"
  | "milestone_1k"
  | "milestone_5k"
  | "goal_setter"
  | "consistent_3m";

export interface Badge {
  id: BadgeId;
  label: string;
  emoji: string;
  description: string;
  earned: boolean;
}

export interface Quest {
  id: string;
  label: string;
  description: string;
  progress: number;
  goal: number;
  rewardXp: number;
  emoji: string;
  done: boolean;
}

interface GameState {
  xp: number;
  level: number;
  xpToNext: number;
  xpInLevel: number;
  levelTitle: string;
  streak: number;
  bestStreak: number;
  badges: Badge[];
  quests: Quest[];
  recentXpGain: number | null;
  awardXp: (amount: number) => void;
  totalDeposits: number;
}

const Ctx = createContext<GameState | null>(null);

const LEVEL_TITLES = [
  "Starter",       // L1
  "Sprout",        // L2
  "Builder",       // L3
  "Climber",       // L4
  "Strategist",    // L5
  "Pathfinder",    // L6
  "Trailblazer",   // L7
  "Visionary",     // L8
  "Architect",     // L9
  "Legend",        // L10+
];

// XP curve: level n requires 100 * n^1.4 cumulative XP
function xpForLevel(level: number) {
  return Math.round(100 * Math.pow(level, 1.4));
}

function deriveLevel(totalXp: number) {
  let lvl = 1;
  let acc = 0;
  while (acc + xpForLevel(lvl) <= totalXp) {
    acc += xpForLevel(lvl);
    lvl++;
  }
  return { level: lvl, xpInLevel: totalXp - acc, xpToNext: xpForLevel(lvl) };
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(1380); // seed: mid level 4
  const [streak] = useState(12);
  const [bestStreak] = useState(18);
  const [recentXpGain, setRecentXpGain] = useState<number | null>(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("rf.xp") : null;
    if (saved) setXp(parseInt(saved, 10));
  }, []);

  const awardXp = (amount: number) => {
    setXp((x) => {
      const next = x + amount;
      if (typeof window !== "undefined") localStorage.setItem("rf.xp", String(next));
      return next;
    });
    setRecentXpGain(amount);
    setTimeout(() => setRecentXpGain(null), 1500);
  };

  const { level, xpInLevel, xpToNext } = useMemo(() => deriveLevel(xp), [xp]);
  const levelTitle = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];

  const totalDeposits = 24;

  const badges: Badge[] = [
    { id: "first_deposit", label: "First Deposit", emoji: "🌱", description: "Made your very first deposit", earned: true },
    { id: "week_streak", label: "7-Day Streak", emoji: "🔥", description: "Saved every day for a week", earned: true },
    { id: "month_streak", label: "Month Master", emoji: "🌟", description: "Saved every day for 30 days", earned: false },
    { id: "round_up_hero", label: "Round-Up Hero", emoji: "💎", description: "100 round-ups completed", earned: true },
    { id: "auto_pilot", label: "Auto-Pilot", emoji: "🚀", description: "Auto-save active for 30 days", earned: true },
    { id: "milestone_1k", label: "First $1K", emoji: "🏆", description: "Reach $1,000 saved", earned: true },
    { id: "milestone_5k", label: "5K Club", emoji: "👑", description: "Reach $5,000 saved", earned: false },
    { id: "goal_setter", label: "Goal Setter", emoji: "🎯", description: "Set your retirement goal", earned: true },
    { id: "consistent_3m", label: "Consistent 90", emoji: "💪", description: "Deposit every week for 3 months", earned: false },
  ];

  const quests: Quest[] = [
    {
      id: "q1",
      label: "Deposit 3 times this week",
      description: "Build the habit, win 50 XP.",
      progress: 2,
      goal: 3,
      rewardXp: 50,
      emoji: "💰",
      done: false,
    },
    {
      id: "q2",
      label: "Try a round-up",
      description: "Spare change adds up fast.",
      progress: 1,
      goal: 1,
      rewardXp: 20,
      emoji: "🪙",
      done: true,
    },
    {
      id: "q3",
      label: "Bump auto-save by $5",
      description: "Future-you says thanks.",
      progress: 0,
      goal: 1,
      rewardXp: 75,
      emoji: "🚀",
      done: false,
    },
    {
      id: "q4",
      label: "Check your projection",
      description: "See where you're headed.",
      progress: 0,
      goal: 1,
      rewardXp: 15,
      emoji: "🔮",
      done: false,
    },
  ];

  return (
    <Ctx.Provider
      value={{
        xp,
        level,
        xpInLevel,
        xpToNext,
        levelTitle,
        streak,
        bestStreak,
        badges,
        quests,
        recentXpGain,
        awardXp,
        totalDeposits,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useGame() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useGame outside provider");
  return c;
}
