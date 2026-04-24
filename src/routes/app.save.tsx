import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Delete, Flame, Trophy, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { balanceToMonthlyIncome, currentSaver, projectBalance } from "@/lib/mock-data";
import { useGame } from "@/lib/game";

export const Route = createFileRoute("/app/save")({
  component: SaveDeposit,
});

function SaveDeposit() {
  const { t, lang } = useI18n();
  const { format, currency, rate } = useCurrency();
  const { awardXp, streak } = useGame();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("0");
  const [source] = useState("RappiPay •• 4821");
  const [stage, setStage] = useState<"input" | "loading" | "success">("input");
  const [earnedXp, setEarnedXp] = useState(0);

  const usdAmount = parseFloat(amount || "0") / rate;
  const yearsToRetirement = currentSaver.retirementAge - currentSaver.age;

  // Estimate monthly retirement income added per this deposit
  // Future value of single deposit grown at 5.5% for years -> SWR/12
  const fv = usdAmount * Math.pow(1.055, yearsToRetirement);
  const monthlyAdded = balanceToMonthlyIncome(fv);

  const newProjected =
    currentSaver.projected.expected +
    balanceToMonthlyIncome(
      projectBalance(0, yearsToRetirement, 0.055, currentSaver.balance + usdAmount).at(-1)! -
        projectBalance(0, yearsToRetirement, 0.055, currentSaver.balance).at(-1)!,
    );

  const tap = (k: string) => {
    if (stage !== "input") return;
    if (k === "back") {
      setAmount((a) => (a.length <= 1 ? "0" : a.slice(0, -1)));
      return;
    }
    if (k === "." && amount.includes(".")) return;
    setAmount((a) => {
      if (a === "0" && k !== ".") return k;
      return a + k;
    });
  };

  const submit = () => {
    if (usdAmount <= 0) return;
    setStage("loading");
    // 10 XP base + 1 XP per dollar (capped 100), bonus +20 if streak day
    const xp = Math.min(100, 10 + Math.round(usdAmount)) + (streak > 0 ? 20 : 0);
    setEarnedXp(xp);
    setTimeout(() => {
      awardXp(xp);
      setStage("success");
    }, 1100);
  };

  if (stage === "success") {
    return (
      <div className="relative flex h-full flex-col items-center justify-center px-6 py-10 text-center">
        <Confetti />
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-mint text-success-foreground shadow-glow">
            <CheckCircle2 className="h-14 w-14" strokeWidth={2} />
          </div>
          <div className="absolute -right-4 -top-2 animate-float-up rounded-full bg-gradient-reward px-3 py-1 text-sm font-black text-gold-foreground shadow-elevated">
            +{earnedXp} XP
          </div>
        </div>
        <h1 className="mt-6 text-2xl font-black tracking-tight text-ink">
          {lang === "es" ? "¡Buen depósito!" : "Nice deposit! 🎉"}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {lang === "es" ? "Tu retiro proyectado ahora es" : "Your projected retirement is now"}
        </p>
        <p className="mt-2 text-4xl font-black text-gradient-brand num">
          {format(newProjected)}/{lang === "es" ? "mes" : "mo"}
        </p>
        <p className="mt-2 text-xs font-semibold text-success num">
          +{format(monthlyAdded)}/{lang === "es" ? "mes" : "mo"} {lang === "es" ? "ganado" : "earned"}
        </p>

        <div className="mt-6 flex w-full max-w-xs items-center gap-2 rounded-2xl border border-border bg-surface p-3">
          <div className="flex flex-1 items-center justify-center gap-1.5">
            <Flame className="h-4 w-4 text-gold" />
            <span className="text-xs font-semibold text-ink num">{streak + 1}d</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex flex-1 items-center justify-center gap-1.5">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-ink">Quest +1</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex flex-1 items-center justify-center gap-1.5">
            <Trophy className="h-4 w-4 text-brand" />
            <span className="text-xs font-semibold text-ink num">+{earnedXp}</span>
          </div>
        </div>

        <div className="mt-6 flex w-full max-w-xs flex-col gap-2">
          <Button
            onClick={() => {
              setAmount("0");
              setStage("input");
            }}
            variant="outline"
            className="h-11 rounded-xl"
          >
            {t("save.again")}
          </Button>
          <Button onClick={() => navigate({ to: "/app/home" })} className="h-11 rounded-xl bg-gradient-brand text-brand-foreground hover:opacity-95">
            {t("save.home")}
          </Button>
        </div>
      </div>
    );
  }

  const quick = [5, 10, 25, 50, 100];

  return (
    <div className="flex h-full flex-col px-4 py-4">
      <div className="mb-2 flex items-center gap-2">
        <Link to="/app/home" className="rounded-full p-2 hover:bg-secondary">
          <ArrowLeft className="h-5 w-5 text-ink" />
        </Link>
        <h1 className="text-lg font-semibold tracking-tight text-ink">{t("save.title")}</h1>
      </div>

      {/* Amount */}
      <div className="mt-4 text-center">
        <p className="text-xs text-ink-muted">{lang === "es" ? "Cantidad" : "Amount"}</p>
        <p className="mt-1 text-6xl font-bold tracking-tight text-ink num">
          <span className="text-3xl text-ink-muted">{currency} </span>
          {amount}
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-all">
          <span>{t("save.preview")}</span>
          <span className="num font-bold">+{format(monthlyAdded)}</span>
          <span>{t("save.toRetire")}</span>
        </div>
      </div>

      {/* Quick chips */}
      <div className="mt-6 flex justify-center gap-2">
        {quick.map((q) => (
          <button
            key={q}
            onClick={() => setAmount(String(q))}
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted hover:border-brand hover:text-brand"
          >
            {format(q / rate, { decimals: 0 })}
          </button>
        ))}
      </div>

      {/* Source */}
      <div className="mt-5 rounded-xl border border-border bg-surface p-3">
        <p className="text-[11px] text-ink-muted">{t("save.source")}</p>
        <p className="mt-0.5 text-sm font-medium text-ink">{source}</p>
      </div>

      {/* Keypad */}
      <div className="mt-auto pt-6">
        <div className="grid grid-cols-3 gap-2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "back"].map((k) => (
            <button
              key={k}
              onClick={() => tap(k)}
              className="flex h-14 items-center justify-center rounded-xl bg-surface text-2xl font-semibold text-ink transition-colors hover:bg-secondary active:bg-accent/20"
            >
              {k === "back" ? <Delete className="h-5 w-5" /> : k}
            </button>
          ))}
        </div>
        <Button
          onClick={submit}
          disabled={usdAmount <= 0 || stage === "loading"}
          className="mt-4 h-12 w-full rounded-lg bg-brand text-brand-foreground hover:opacity-90 disabled:opacity-40"
        >
          {stage === "loading" ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              {lang === "es" ? "Procesando..." : "Processing..."}
            </span>
          ) : (
            `${t("save.cta")} ${format(usdAmount)}`
          )}
        </Button>
      </div>
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 30 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((_, i) => (
        <span
          key={i}
          className="absolute top-0 h-2 w-2 rounded-sm"
          style={{
            left: `${(i * 7) % 100}%`,
            backgroundColor: i % 2 ? "var(--accent)" : "var(--brand)",
            animation: `fall ${1.5 + (i % 5) * 0.3}s ease-in ${(i % 7) * 0.08}s forwards`,
            transform: "translateY(-20px) rotate(0deg)",
          }}
        />
      ))}
      <style>{`@keyframes fall { to { transform: translateY(110vh) rotate(540deg); opacity: 0.2; } }`}</style>
    </div>
  );
}
