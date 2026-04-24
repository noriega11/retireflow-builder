import { useNavigate } from "@tanstack/react-router";
import { Briefcase, Shield, User } from "lucide-react";
import { useRole, type Role } from "@/lib/role";
import { useI18n } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const ROUTES: Record<Role, string> = {
  saver: "/app/home",
  partner: "/partner/overview",
  operator: "/admin/pulse",
};

const ICONS: Record<Role, React.ComponentType<{ className?: string }>> = {
  saver: User,
  partner: Briefcase,
  operator: Shield,
};

export function RoleSwitcher() {
  const { role, setRole } = useRole();
  const { t } = useI18n();
  const navigate = useNavigate();
  const Icon = ICONS[role];

  const choose = (r: Role) => {
    setRole(r);
    navigate({ to: ROUTES[r] });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 rounded-full border-border bg-surface">
          <Icon className="h-4 w-4 text-brand" />
          <span className="hidden sm:inline">{t(`role.${role}`)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{t("role.switch")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(["saver", "partner", "operator"] as Role[]).map((r) => {
          const I = ICONS[r];
          return (
            <DropdownMenuItem key={r} onClick={() => choose(r)} className="gap-2">
              <I className="h-4 w-4 text-brand" />
              <span>{t(`role.${r}`)}</span>
              {role === r && <span className="ml-auto text-xs text-ink-muted">●</span>}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
