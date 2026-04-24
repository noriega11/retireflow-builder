import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Lock,
  Zap,
  Wallet,
  Target,
  Star,
  CheckCircle2,
  PiggyBank,
  HeartHandshake,
  Smartphone,
  LineChart,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { TrustFooter } from "@/components/TrustFooter";
import { Button } from "@/components/ui/button";
import heroVendor from "@/assets/hero-vendor.jpg";
import driverPhoto from "@/assets/testimonial-driver.jpg";
import stylistPhoto from "@/assets/testimonial-stylist.jpg";
import builderPhoto from "@/assets/testimonial-builder.jpg";
import featureDeposit from "@/assets/feature-deposit.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "RetireFlow — Retirement savings built for the informal economy" },
      {
        name: "description",
        content:
          "Automatic micro-pensions for the 140M+ workers in LATAM without a 401(k). Save from $1, in your wallet, regulated and transparent.",
      },
      { property: "og:title", content: "RetireFlow — Retirement, made for everyone" },
      {
        property: "og:description",
        content: "Tiny deposits today. A real pension tomorrow. No employer required.",
      },
    ],
  }),
});

function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar variant="console" />

      <main className="flex-1">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-secondary/30 to-background" />
          <div
            aria-hidden
            className="absolute -top-40 -right-40 -z-10 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -left-40 -z-10 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-mint)" }}
          />

          <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
              <div className="animate-fade-in">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-ink-muted backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Built for the 140M+ informal workers in LATAM
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-6xl">
                  Retirement,{" "}
                  <span className="text-gradient-brand">made for everyone</span>.
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
                  Save as little as <span className="font-semibold text-ink">$1</span> from
                  your wallet — automatically. Build a real pension on your terms, with no
                  employer, no paperwork and no minimum balance.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-xl bg-brand text-brand-foreground shadow-elevated hover:opacity-95"
                  >
                    <Link to="/app/onboarding">
                      Start saving — it's free
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-xl">
                    <Link to="/partner/overview">I'm a partner</Link>
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-success" strokeWidth={2} />
                    Regulated by CNBV
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Lock className="h-4 w-4 text-success" strokeWidth={2} />
                    Bank-grade encryption
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-success" strokeWidth={2} />
                    SIPC-equivalent up to $250K
                  </span>
                </div>
              </div>

              {/* Hero visual */}
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elevated">
                  <img
                    src={heroVendor}
                    alt="A market vendor checking her retirement balance on the RetireFlow app"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Floating stat card */}
                  <div className="absolute left-4 top-4 rounded-2xl bg-surface/95 p-3 shadow-lg backdrop-blur sm:left-5 sm:top-5">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-ink-muted">
                      Projected pension
                    </p>
                    <p className="num text-2xl font-bold text-ink">$528<span className="text-sm font-medium text-ink-muted">/mo</span></p>
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-success">
                      <TrendingUp className="h-3 w-3" />
                      +$2.40 today
                    </div>
                  </div>

                  {/* Floating reward card */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-2xl bg-surface/95 px-3 py-2 shadow-lg backdrop-blur sm:bottom-5 sm:right-5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full shimmer-gold">
                      <Star className="h-4 w-4 text-ink" fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-ink-muted">
                        12-day streak
                      </p>
                      <p className="text-xs font-semibold text-ink">+50 XP earned</p>
                    </div>
                  </div>
                </div>

                {/* Floating chip below hero on mobile */}
                <div className="absolute -bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-ink shadow-lg sm:flex">
                  <HeartHandshake className="h-4 w-4 text-brand" />
                  Trusted by 12,400+ savers
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
              <Stat value="12,400+" label="Active savers" />
              <Stat value="$1.2M" label="Saved together" />
              <Stat value="7" label="Wallet partners" />
              <Stat value="98%" label="Keep saving monthly" />
            </div>
          </div>
        </section>

        {/* ===== TRUSTED BY ===== */}
        <section className="border-y border-border bg-surface/50">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <p className="text-center text-xs font-medium uppercase tracking-wider text-ink-muted">
              Trusted by leading wallets &amp; gig platforms
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
              {["MercadoPago", "Rappi", "DiDi", "Nubank", "Konfío", "Bitso", "Clip"].map(
                (name) => (
                  <span
                    key={name}
                    className="text-sm font-semibold tracking-tight text-ink-muted"
                  >
                    {name}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              How it works
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              From your first peso to a pension — in 3 steps
            </h2>
            <p className="mt-3 text-ink-muted">
              No employer, no paperwork, no minimum. Just the same wallet you already use.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Step
              n={1}
              icon={Smartphone}
              title="Link your wallet"
              desc="Connect MercadoPago, Nubank or any partner wallet in 30 seconds. No bank required."
            />
            <Step
              n={2}
              icon={Zap}
              title="Set autosave"
              desc="A small slice of every gig you finish goes straight to your retirement — automatically."
            />
            <Step
              n={3}
              icon={LineChart}
              title="Watch it grow"
              desc="See your projected monthly pension update with every deposit. Conservative, expected and optimistic."
            />
          </div>
        </section>

        {/* ===== FEATURE SPLIT ===== */}
        <section className="bg-secondary/40">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-3xl opacity-30 blur-2xl"
                style={{ background: "var(--gradient-brand)" }}
              />
              <img
                src={featureDeposit}
                alt="A small deposit visualised next to a live pension chart"
                width={1024}
                height={768}
                loading="lazy"
                className="rounded-3xl shadow-elevated"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Why RetireFlow
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                A pension that fits the way you already work
              </h2>
              <p className="mt-3 text-ink-muted">
                Built for drivers, vendors, stylists, builders and creators — anyone
                whose income doesn't fit a payroll system.
              </p>
              <ul className="mt-6 space-y-4">
                <Benefit
                  icon={PiggyBank}
                  title="Save from $1"
                  desc="No minimums, no monthly fees. Round-up every transaction or set a fixed weekly amount."
                />
                <Benefit
                  icon={Target}
                  title="See the future, today"
                  desc="Every deposit instantly shows you how much more monthly pension you've just unlocked."
                />
                <Benefit
                  icon={ShieldCheck}
                  title="Regulated &amp; segregated"
                  desc="Your money sits in segregated custody with SIPC-equivalent insurance. We never touch principal."
                />
                <Benefit
                  icon={Wallet}
                  title="Withdraw if life happens"
                  desc="Up to 10% emergency access without penalty. Real pensions, not real prisons."
                />
              </ul>
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              Real savers
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              People building a future, one deposit at a time
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Testimonial
              photo={driverPhoto}
              quote="I always thought retirement was for people with bosses. Now I save $30 a week from my rides — and I can see it grow."
              name="Mateo R."
              role="Rideshare driver, Mexico City"
            />
            <Testimonial
              photo={stylistPhoto}
              quote="The streaks make me actually want to save. I'm on a 47-day run. My future self is going to be proud."
              name="Camila S."
              role="Hairstylist, Bogotá"
            />
            <Testimonial
              photo={builderPhoto}
              quote="At 52 I thought it was too late. RetireFlow showed me that even small weekly amounts add up. I sleep better now."
              name="Don Joaquín"
              role="Independent builder, Guadalajara"
            />
          </div>
        </section>

        {/* ===== AUDIENCES ===== */}
        <section className="border-t border-border bg-surface/50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  One platform, three experiences
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Whoever you are, jump in
                </h2>
              </div>
              <p className="max-w-md text-sm text-ink-muted">
                Click any card to explore the live experience for that role.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <AudienceCard
                icon={Users}
                title="For Savers"
                desc="Informal &amp; gig workers building a real retirement, one micro-deposit at a time."
                cta="Open the saver app"
                to="/app/home"
                tone="brand"
              />
              <AudienceCard
                icon={Building2}
                title="For Partners"
                desc="Wallets, neobanks and gig platforms that embed RetireFlow and share revenue."
                cta="See partner console"
                to="/partner/overview"
                tone="accent"
              />
              <AudienceCard
                icon={TrendingUp}
                title="For Operators"
                desc="The RetireFlow team — manage partners, funds, compliance and growth in one place."
                cta="Open admin"
                to="/admin/pulse"
                tone="gold"
              />
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="relative overflow-hidden rounded-3xl px-8 py-14 text-center shadow-elevated sm:px-16 sm:py-20">
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{ background: "var(--gradient-hero)" }}
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, white 0px, transparent 1px), radial-gradient(circle at 80% 70%, white 0px, transparent 1px)",
                backgroundSize: "60px 60px, 90px 90px",
              }}
            />
            <Sparkles className="mx-auto h-8 w-8 text-white/90" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Your future self is waiting.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
              Start with $1. Earn XP. Build a pension on your own terms — no employer
              required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-white text-brand hover:bg-white/90"
              >
                <Link to="/app/onboarding">
                  Open my account
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl border-white/30 bg-white/0 text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/app/projection">Try the simulator</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <TrustFooter />
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-surface px-5 py-6 text-center">
      <p className="num text-2xl font-bold text-ink sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-ink-muted">
        {label}
      </p>
    </div>
  );
}

function Step({
  n,
  icon: Icon,
  title,
  desc,
}: {
  n: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="absolute -right-4 -top-4 text-7xl font-black text-secondary/80 select-none">
        {n}
      </div>
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="relative mt-4 text-lg font-semibold text-ink">{title}</h3>
      <p className="relative mt-1.5 text-sm leading-relaxed text-ink-muted">{desc}</p>
    </div>
  );
}

function Benefit({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground">
        <Icon className="h-5 w-5 text-brand" />
      </div>
      <div>
        <p className="font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-sm text-ink-muted" dangerouslySetInnerHTML={{ __html: desc }} />
      </div>
    </li>
  );
}

function Testimonial({
  photo,
  quote,
  name,
  role,
}: {
  photo: string;
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <figure className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
        “{quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <img
          src={photo}
          alt={name}
          width={48}
          height={48}
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-ink">{name}</p>
          <p className="text-xs text-ink-muted">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function AudienceCard({
  icon: Icon,
  title,
  desc,
  cta,
  to,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  cta: string;
  to: string;
  tone: "brand" | "accent" | "gold";
}) {
  const toneStyles =
    tone === "brand"
      ? "bg-brand/10 text-brand"
      : tone === "accent"
        ? "bg-accent/20 text-brand"
        : "bg-gold/20 text-ink";
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-elevated"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: "var(--gradient-brand)" }}
      />
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneStyles}`}>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm text-ink-muted" dangerouslySetInnerHTML={{ __html: desc }} />
      <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </p>
    </Link>
  );
}
