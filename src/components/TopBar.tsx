import { Link } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { RoleSwitcher } from "./RoleSwitcher";
import { useI18n } from "@/lib/i18n";
import { useCurrency, type Currency } from "@/lib/currency";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function TopBar({ variant = "app" }: { variant?: "app" | "console" }) {
  const { lang, setLang } = useI18n();
  const { currency, setCurrency } = useCurrency();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-surface/90 px-4 backdrop-blur">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground font-bold">
          R
        </div>
        {variant === "console" && (
          <span className="text-sm font-semibold tracking-tight text-ink">RetireFlow</span>
        )}
      </Link>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1 text-ink-muted">
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium uppercase">{lang}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLang("es")}>Español</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLang("en")}>English</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-ink-muted">
              <span className="text-xs font-semibold">{currency}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {(["USD", "MXN", "COP", "BRL"] as Currency[]).map((c) => (
              <DropdownMenuItem key={c} onClick={() => setCurrency(c)}>
                {c}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <RoleSwitcher />
      </div>
    </header>
  );
}
