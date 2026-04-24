import { Outlet, Link, useLocation, createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Code2,
  Megaphone,
  Receipt,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { TrustFooter } from "@/components/TrustFooter";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/partner")({
  component: PartnerLayout,
});

function PartnerLayout() {
  const { t } = useI18n();
  const location = useLocation();
  const [sandbox, setSandbox] = useState(false);

  const items = [
    { to: "/partner/overview", icon: BarChart3, label: t("partner.overview") },
    { to: "/partner/savers", icon: Users, label: t("partner.savers") },
    { to: "/partner/campaigns", icon: Megaphone, label: t("partner.campaigns") },
    { to: "/partner/integration", icon: Code2, label: t("partner.integration") },
    { to: "/partner/revenue", icon: Receipt, label: t("partner.revenue") },
    { to: "/partner/team", icon: Settings, label: t("partner.team") },
  ] as const;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar variant="console" />
      {sandbox && (
        <div
          className="flex items-center justify-center gap-2 bg-warning/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-warning"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212,139,28,0.08) 10px, rgba(212,139,28,0.08) 20px)",
          }}
        >
          {t("partner.sandbox")}
        </div>
      )}
      <div className="flex flex-1">
        <aside className="hidden w-60 shrink-0 border-r border-border bg-sidebar p-4 lg:block">
          <div className="mb-3 px-3">
            <p className="text-[10px] uppercase tracking-wider text-ink-muted">RappiPay</p>
            <p className="text-sm font-semibold text-ink">Partner Console</p>
          </div>
          <nav className="space-y-1">
            {items.map((it) => {
              const active = location.pathname === it.to;
              const Icon = it.icon;
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-brand text-brand-foreground"
                      : "text-ink-muted hover:bg-secondary hover:text-ink",
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                  {it.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 rounded-lg border border-border bg-surface p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-ink">Sandbox</span>
              <Switch checked={sandbox} onCheckedChange={setSandbox} />
            </div>
            <p className="mt-1 text-[10px] text-ink-muted">
              Test environment with mock data
            </p>
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <TrustFooter />
    </div>
  );
}
