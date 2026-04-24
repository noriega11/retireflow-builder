import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Filter } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { recentDeposits } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/activity")({
  component: ActivityPage,
});

function ActivityPage() {
  const { lang } = useI18n();
  const { format } = useCurrency();
  const [filter, setFilter] = useState<"all" | "auto" | "manual" | "round_up">("all");
  const list = recentDeposits.filter((d) => filter === "all" || d.type === filter);

  return (
    <div className="px-4 py-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-ink">
          {lang === "es" ? "Actividad" : "Activity"}
        </h1>
        <Button variant="outline" size="sm" className="rounded-full gap-1.5">
          <Download className="h-3.5 w-3.5" />
          PDF
        </Button>
      </div>

      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="h-4 w-4 shrink-0 text-ink-muted" />
        {(["all", "auto", "manual", "round_up"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === k ? "bg-brand text-brand-foreground" : "bg-surface text-ink-muted border border-border"
            }`}
          >
            {k === "all" ? (lang === "es" ? "Todo" : "All") : k === "round_up" ? "Round-up" : k === "auto" ? "Auto" : (lang === "es" ? "Manual" : "Manual")}
          </button>
        ))}
      </div>

      <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface">
        {list.map((d) => (
          <li key={d.id} className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/10 text-xs font-semibold text-success">
              +
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink num">{format(d.amount)}</p>
              <p className="text-[11px] text-ink-muted">{d.source} · {d.type}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-medium text-success num">+{format(d.retirementIncomeAdded)}/{lang === "es" ? "mes" : "mo"}</p>
              <p className="text-[10px] text-ink-muted">
                {new Date(d.date).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
