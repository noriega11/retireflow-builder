import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/partner/team")({
  component: Team,
});

function Team() {
  const { lang } = useI18n();
  const team = [
    { n: "Carlos M.", e: "carlos@rappipay.com", role: "Owner" },
    { n: "Ana T.", e: "ana@rappipay.com", role: "Admin" },
    { n: "Luis R.", e: "luis@rappipay.com", role: "Analyst" },
    { n: "Paula G.", e: "paula@rappipay.com", role: "Read-only" },
  ];
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold tracking-tight text-ink">{lang === "es" ? "Equipo" : "Team"}</h1>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">{lang === "es" ? "Persona" : "Person"}</th>
              <th className="px-4 py-2.5 text-left font-medium">{lang === "es" ? "Correo" : "Email"}</th>
              <th className="px-4 py-2.5 text-left font-medium">{lang === "es" ? "Rol" : "Role"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {team.map((m) => (
              <tr key={m.e}>
                <td className="px-4 py-3 font-medium text-ink">{m.n}</td>
                <td className="px-4 py-3 text-ink-muted">{m.e}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand">{m.role}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
