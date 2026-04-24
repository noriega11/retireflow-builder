import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { TrustFooter } from "@/components/TrustFooter";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "RetireFlow — Micro-pensiones para LATAM" },
      { name: "description", content: "Ahorro de retiro automatizado, regulado y flexible para 140M+ trabajadores informales." },
    ],
  }),
});

function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar variant="console" />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-secondary/40" />
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 sm:pt-28">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-muted">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  Para 140M+ trabajadores informales en LATAM
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-6xl">
                  Tu retiro,{" "}
                  <span className="text-brand">automático</span> y{" "}
                  <span className="text-accent">flexible</span>.
                </h1>
                <p className="mt-5 max-w-xl text-lg text-ink-muted">
                  Cuenta de ahorro de largo plazo con micro-depósitos. Sin compromisos rígidos.
                  Regulada, transparente y diseñada para la economía gig.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-lg bg-brand text-brand-foreground hover:opacity-90">
                    <Link to="/app/onboarding">
                      Empezar ahora
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-lg">
                    <Link to="/partner/overview">Soy un socio</Link>
                  </Button>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-ink-muted">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  Regulado por CNBV · Custodia segregada · Cobertura tipo SIPC
                </div>
              </div>

              {/* Hero card */}
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent/10 blur-2xl" />
                <div className="rounded-3xl border border-border bg-surface p-1 shadow-xl">
                  <div className="rounded-[20px] bg-brand p-8 text-brand-foreground">
                    <div className="h-1 w-12 rounded-full bg-accent" />
                    <p className="mt-4 text-sm opacity-80">Ingreso mensual proyectado al retirarte</p>
                    <p className="mt-2 text-5xl font-bold tracking-tight num">$528</p>
                    <p className="mt-1 text-sm opacity-70">rango: $412 – $678</p>
                    <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                      <div>
                        <p className="text-xs opacity-70">Ahorrado hoy</p>
                        <p className="mt-1 text-xl font-semibold num">$2,840</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-70">Próximo depósito</p>
                        <p className="mt-1 text-xl font-semibold num">$25.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three audiences */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Una plataforma, tres experiencias</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <AudienceCard
              icon={Users}
              title="Ahorradores"
              desc="Trabajadores informales y gig que construyen un retiro real con micro-depósitos."
              cta="Abrir app"
              to="/app/home"
            />
            <AudienceCard
              icon={Building2}
              title="Socios"
              desc="Wallets, neobancos y plataformas gig que integran RetireFlow y comparten ingresos."
              cta="Ver consola"
              to="/partner/overview"
            />
            <AudienceCard
              icon={TrendingUp}
              title="Operadores"
              desc="Equipo RetireFlow gestionando socios, fondos, cumplimiento y crecimiento."
              cta="Ir al panel"
              to="/admin/pulse"
            />
          </div>
        </section>
      </main>

      <TrustFooter />
    </div>
  );
}

function AudienceCard({
  icon: Icon,
  title,
  desc,
  cta,
  to,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  cta: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink-muted">{desc}</p>
      <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </p>
    </Link>
  );
}
