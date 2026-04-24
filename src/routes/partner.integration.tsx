import { createFileRoute } from "@tanstack/react-router";
import { Copy, RefreshCw } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/partner/integration")({
  component: Integration,
});

function Integration() {
  const { lang } = useI18n();
  const events = [
    { event: "deposit.succeeded", at: "2m ago", status: "success" },
    { event: "saver.created", at: "8m ago", status: "success" },
    { event: "kyc.approved", at: "14m ago", status: "success" },
    { event: "deposit.failed", at: "32m ago", status: "failed" },
    { event: "deposit.succeeded", at: "1h ago", status: "success" },
    { event: "webhook.retry", at: "2h ago", status: "retrying" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">{lang === "es" ? "Integración" : "Integration"}</h1>
        <p className="mt-1 text-sm text-ink-muted">{lang === "es" ? "Llaves de API, webhooks y SDK" : "API keys, webhooks and SDK"}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {[{ label: "Sandbox", k: "sk_sandbox_4f8a...d92e" }, { label: "Production", k: "sk_live_c1b3...a708" }].map((row) => (
          <div key={row.label} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{row.label}</p>
              <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs">
                <RefreshCw className="h-3 w-3" /> Rotate
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <code className="flex-1 truncate rounded-md bg-secondary px-3 py-2 text-xs font-mono text-ink">{row.k}</code>
              <Button size="sm" variant="outline" className="h-9"><Copy className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="text-sm font-semibold text-ink">Webhook URL</p>
        <code className="mt-2 block rounded-md bg-secondary px-3 py-2 text-xs font-mono text-ink">https://api.rappipay.com/retireflow/webhook</code>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["saver.created", "deposit.succeeded", "deposit.failed", "kyc.approved", "kyc.rejected"].map((e) => (
            <span key={e} className="rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand">{e}</span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="mb-2 text-sm font-semibold text-ink">{lang === "es" ? "Snippet embebido" : "Embed snippet"}</p>
        <pre className="overflow-x-auto rounded-md bg-ink p-3 text-xs text-brand-foreground">
{`<script src="https://cdn.retireflow.com/embed.js"
  data-org="rappipay"
  data-color="#FF441F"
  data-placement="card">
</script>`}
        </pre>
      </div>

      <div className="rounded-xl border border-border bg-surface">
        <div className="border-b border-border px-4 py-3">
          <p className="text-sm font-semibold text-ink">{lang === "es" ? "Eventos recientes" : "Recent events"}</p>
        </div>
        <ul className="divide-y divide-border">
          {events.map((e, i) => (
            <li key={i} className="flex items-center justify-between px-4 py-2.5 text-sm">
              <code className="text-xs font-mono text-ink">{e.event}</code>
              <div className="flex items-center gap-3">
                <span className="text-xs text-ink-muted">{e.at}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  e.status === "success" ? "bg-success/10 text-success" :
                  e.status === "failed" ? "bg-destructive/10 text-destructive" :
                  "bg-warning/15 text-warning"
                }`}>{e.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
