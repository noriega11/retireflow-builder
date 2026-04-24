import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/partner/campaigns")({
  component: Campaigns,
});

function Campaigns() {
  const { lang } = useI18n();
  const items = [
    { name: lang === "es" ? "Bienvenida + 1er depósito" : "Welcome + first deposit", channel: "Push + In-app", status: "Live", reach: "12,400", conv: "8.2%" },
    { name: lang === "es" ? "Reactivar inactivos 60d" : "Reactivate 60d inactive", channel: "Email", status: "Live", reach: "3,210", conv: "4.1%" },
    { name: lang === "es" ? "Subir % de autosave (A/B)" : "Bump autosave % (A/B)", channel: "In-app", status: "Test", reach: "1,840", conv: "11.7%" },
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">{lang === "es" ? "Campañas" : "Campaigns"}</h1>
          <p className="mt-1 text-sm text-ink-muted">{lang === "es" ? "Empuja a tus ahorradores hacia hábitos saludables" : "Nudge savers into healthy habits"}</p>
        </div>
        <Button className="gap-1.5 rounded-lg bg-brand text-brand-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> {lang === "es" ? "Nueva campaña" : "New campaign"}
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">{lang === "es" ? "Nombre" : "Name"}</th>
              <th className="px-4 py-2.5 text-left font-medium">{lang === "es" ? "Canal" : "Channel"}</th>
              <th className="px-4 py-2.5 text-left font-medium">Status</th>
              <th className="px-4 py-2.5 text-right font-medium">{lang === "es" ? "Alcance" : "Reach"}</th>
              <th className="px-4 py-2.5 text-right font-medium">{lang === "es" ? "Conversión" : "Conversion"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((c, i) => (
              <tr key={i} className="hover:bg-secondary/30">
                <td className="px-4 py-3 font-medium text-ink">
                  <div className="flex items-center gap-2"><Megaphone className="h-4 w-4 text-accent" />{c.name}</div>
                </td>
                <td className="px-4 py-3 text-ink-muted">{c.channel}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${c.status === "Live" ? "bg-success/10 text-success" : "bg-warning/15 text-warning"}`}>{c.status}</span>
                </td>
                <td className="px-4 py-3 text-right num text-ink">{c.reach}</td>
                <td className="px-4 py-3 text-right num font-semibold text-success">{c.conv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
