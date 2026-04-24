import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { partners } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/partners")({
  component: Partners,
});

function Partners() {
  const { lang } = useI18n();
  const { format } = useCurrency();
  const stages = ["Applied", "Diligence", "Contracted", "Integrated", "Live"] as const;

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold tracking-tight text-ink">{lang === "es" ? "Socios" : "Partners"}</h1>
      <div className="grid gap-3 md:grid-cols-5">
        {stages.map((s) => {
          const list = partners.filter((p) => p.stage === s);
          const aum = list.reduce((a, p) => a + p.aum, 0);
          return (
            <div key={s} className="rounded-xl border border-border bg-surface p-3">
              <p className="text-[10px] uppercase tracking-wider text-ink-muted">{s}</p>
              <p className="mt-1 text-2xl font-bold text-ink num">{list.length}</p>
              <p className="text-[10px] text-ink-muted num">{aum > 0 ? format(aum, { compact: true }) : "—"}</p>
            </div>
          );
        })}
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">{lang === "es" ? "Nombre" : "Name"}</th>
              <th className="px-4 py-2.5 text-left font-medium">Stage</th>
              <th className="px-4 py-2.5 text-right font-medium">{lang === "es" ? "Ahorradores" : "Savers"}</th>
              <th className="px-4 py-2.5 text-right font-medium">AUM</th>
              <th className="px-4 py-2.5 text-right font-medium">{lang === "es" ? "Salud" : "Health"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {partners.map((p) => (
              <tr key={p.id} className="hover:bg-secondary/30">
                <td className="px-4 py-3 font-medium text-ink">{p.name} <span className="ml-1 text-[10px] text-ink-muted">{p.country}</span></td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand">{p.stage}</span>
                </td>
                <td className="px-4 py-3 text-right num text-ink">{p.activeSavers}</td>
                <td className="px-4 py-3 text-right num text-ink">{p.aum > 0 ? format(p.aum, { compact: true }) : "—"}</td>
                <td className="px-4 py-3 text-right">
                  <span className={`num text-xs font-semibold ${p.health > 80 ? "text-success" : p.health > 70 ? "text-warning" : "text-destructive"}`}>{p.health}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
