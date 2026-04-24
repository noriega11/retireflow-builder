import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { Home, PiggyBank, LineChart, Activity, User } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { TrustFooter } from "@/components/TrustFooter";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const location = useLocation();
  const isOnboarding = location.pathname.startsWith("/app/onboarding");

  if (isOnboarding) {
    return (
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Phone-frame on desktop, full-bleed on mobile */}
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-background shadow-none md:my-6 md:min-h-[calc(100vh-3rem)] md:rounded-[2.5rem] md:border md:border-border md:bg-surface md:shadow-2xl md:overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto pb-24">
          <Outlet />
        </main>
        <BottomNav />
        <TrustFooter />
      </div>
    </div>
  );
}

function BottomNav() {
  const { t } = useI18n();
  const location = useLocation();
  const items = [
    { to: "/app/home", icon: Home, label: t("tab.home") },
    { to: "/app/save", icon: PiggyBank, label: t("tab.save") },
    { to: "/app/projection", icon: LineChart, label: t("tab.projection") },
    { to: "/app/activity", icon: Activity, label: t("tab.activity") },
    { to: "/app/profile", icon: User, label: t("tab.profile") },
  ] as const;
  return (
    <nav className="fixed bottom-0 left-1/2 z-30 flex w-full max-w-[480px] -translate-x-1/2 items-center justify-around border-t border-border bg-surface/95 px-2 py-2 backdrop-blur md:absolute md:bottom-8">
      {items.map((it) => {
        const Icon = it.icon;
        const active = location.pathname === it.to;
        return (
          <Link
            key={it.to}
            to={it.to}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-colors",
              active ? "text-brand" : "text-ink-muted hover:text-ink",
            )}
          >
            <Icon className={cn("h-5 w-5", active && "fill-brand/10")} strokeWidth={1.75} />
            <span>{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
