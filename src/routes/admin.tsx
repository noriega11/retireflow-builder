import { Outlet, Link, useLocation, createFileRoute } from "@tanstack/react-router";
import { Activity, Building2, DollarSign, Layers, ShieldCheck, Users } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { TrustFooter } from "@/components/TrustFooter";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { t } = useI18n();
  const location = useLocation();

  const groups = [
    {
      label: t("partner.overview"),
      items: [{ to: "/admin/pulse", icon: Activity, label: t("admin.pulse") }],
    },
    {
      label: lang_label("Network", "Red"),
      items: [
        { to: "/admin/partners", icon: Building2, label: t("admin.partners") },
        { to: "/admin/savers", icon: Users, label: t("admin.savers") },
      ],
    },
    {
      label: lang_label("Operations", "Operaciones"),
      items: [
        { to: "/admin/funds", icon: Layers, label: t("admin.funds") },
        { to: "/admin/compliance", icon: ShieldCheck, label: t("admin.compliance") },
        { to: "/admin/finance", icon: DollarSign, label: t("admin.finance") },
      ],
    },
  ] as const;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar variant="console" />
      <div className="flex flex-1">
        <aside className="hidden w-60 shrink-0 border-r border-border bg-sidebar p-4 lg:block">
          <div className="mb-3 px-3">
            <p className="text-[10px] uppercase tracking-wider text-ink-muted">RetireFlow</p>
            <p className="text-sm font-semibold text-ink">Operator Admin</p>
          </div>
          {groups.map((g) => (
            <div key={g.label} className="mb-4">
              <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">{g.label}</p>
              <nav className="space-y-1">
                {g.items.map((it) => {
                  const active = location.pathname === it.to;
                  const Icon = it.icon;
                  return (
                    <Link
                      key={it.to}
                      to={it.to}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active ? "bg-brand text-brand-foreground" : "text-ink-muted hover:bg-secondary hover:text-ink",
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                      {it.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </aside>
        <main className="min-w-0 flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <TrustFooter />
    </div>
  );
}

function lang_label(en: string, es: string) {
  if (typeof window === "undefined") return es;
  return localStorage.getItem("rf.lang") === "en" ? en : es;
}
