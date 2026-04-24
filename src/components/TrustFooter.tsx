import { ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function TrustFooter() {
  const { t } = useI18n();
  return (
    <div className="flex items-center justify-center gap-2 border-t border-border bg-surface/60 px-4 py-2 text-[11px] leading-tight text-ink-muted">
      <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-success" strokeWidth={1.75} />
      <span className="text-center">{t("trust.footer")}</span>
    </div>
  );
}
