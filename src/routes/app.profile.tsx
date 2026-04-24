import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ChevronRight, FileText, Globe, HelpCircle, LogOut, ShieldCheck, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { currentSaver } from "@/lib/mock-data";

export const Route = createFileRoute("/app/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { lang } = useI18n();
  const items = [
    { icon: ShieldCheck, label: lang === "es" ? "Verificación de identidad" : "Identity verification", value: lang === "es" ? "Aprobada" : "Approved", tone: "success" },
    { icon: Users, label: lang === "es" ? "Beneficiarios" : "Beneficiaries", value: "2", tone: "muted" },
    { icon: Bell, label: lang === "es" ? "Notificaciones" : "Notifications", value: "On", tone: "muted" },
    { icon: Globe, label: lang === "es" ? "Idioma" : "Language", value: lang === "es" ? "Español" : "English", tone: "muted" },
    { icon: FileText, label: lang === "es" ? "Documentos legales" : "Legal documents", value: "", tone: "muted" },
    { icon: HelpCircle, label: lang === "es" ? "Ayuda" : "Help", value: "", tone: "muted" },
  ] as const;

  return (
    <div className="px-4 py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-xl font-bold text-brand">
          M
        </div>
        <div>
          <p className="text-base font-semibold text-ink">{currentSaver.name}</p>
          <p className="text-xs text-ink-muted">maria.g@email.com · MX</p>
        </div>
      </div>

      <ul className="mt-6 divide-y divide-border rounded-xl border border-border bg-surface">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-3 px-4 py-3.5">
            <it.icon className="h-4 w-4 text-ink-muted" strokeWidth={1.75} />
            <span className="flex-1 text-sm text-ink">{it.label}</span>
            <span className={`text-xs ${it.tone === "success" ? "text-success font-medium" : "text-ink-muted"}`}>
              {it.value}
            </span>
            <ChevronRight className="h-4 w-4 text-ink-muted" />
          </li>
        ))}
      </ul>

      <Link
        to="/"
        className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/5"
      >
        <LogOut className="h-4 w-4" />
        {lang === "es" ? "Cerrar sesión" : "Sign out"}
      </Link>
    </div>
  );
}
