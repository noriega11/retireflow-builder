import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Camera, CheckCircle2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";

export const Route = createFileRoute("/app/onboarding")({
  component: Onboarding,
});

const TOTAL = 5;

function Onboarding() {
  const { lang } = useI18n();
  const { format, rate } = useCurrency();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [age, setAge] = useState(65);
  const [target, setTarget] = useState(500); // USD
  const [rule, setRule] = useState<string | null>(null);
  const [linked, setLinked] = useState<string | null>(null);

  const next = () => (step < TOTAL ? setStep(step + 1) : navigate({ to: "/app/home" }));
  const back = () => setStep(Math.max(1, step - 1));

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      {/* Header */}
      {step > 1 && (
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={back} className="rounded-full p-2 hover:bg-secondary">
            <ChevronLeft className="h-5 w-5 text-ink" />
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i + 1 <= step ? "w-6 bg-accent" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
          <button onClick={next} className="text-xs font-medium text-ink-muted hover:text-ink">
            {step < TOTAL ? (lang === "es" ? "Saltar" : "Skip") : ""}
          </button>
        </div>
      )}

      <div className="flex flex-1 flex-col px-6 py-4">
        {step === 1 && <StepWelcome onNext={next} />}
        {step === 2 && <StepKyc onNext={next} />}
        {step === 3 && <StepLink linked={linked} setLinked={setLinked} onNext={next} />}
        {step === 4 && (
          <StepGoal
            age={age}
            setAge={setAge}
            target={target}
            setTarget={setTarget}
            rate={rate}
            format={format}
            onNext={next}
          />
        )}
        {step === 5 && <StepRule rule={rule} setRule={setRule} onNext={next} format={format} />}
      </div>
    </div>
  );
}

function StepWelcome({ onNext }: { onNext: () => void }) {
  const { lang } = useI18n();
  return (
    <div className="-mx-6 -my-4 flex min-h-screen flex-col items-center justify-between bg-brand px-8 py-12 text-brand-foreground">
      <div className="mt-16 flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-3xl font-bold text-accent-foreground">
          R
        </div>
        <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight">
          {lang === "es" ? "Tu retiro empieza con un clic" : "Your retirement starts with one tap"}
        </h1>
        <p className="mt-4 text-base opacity-80">
          {lang === "es"
            ? "Ahorro de retiro automatizado, regulado y flexible. Diseñado para ti."
            : "Automated, regulated, flexible retirement savings. Built for you."}
        </p>
      </div>
      <div className="w-full">
        <Button
          onClick={onNext}
          className="h-12 w-full rounded-lg bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {lang === "es" ? "Empezar" : "Get started"}
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
        <p className="mt-3 text-center text-[11px] opacity-70">
          {lang === "es" ? "Al continuar aceptas los Términos" : "By continuing you accept the Terms"}
        </p>
      </div>
    </div>
  );
}

function StepKyc({ onNext }: { onNext: () => void }) {
  const { lang } = useI18n();
  const [captured, setCaptured] = useState(false);
  return (
    <div className="flex flex-1 flex-col">
      <h2 className="text-2xl font-bold tracking-tight text-ink">
        {lang === "es" ? "¿Quién eres?" : "Who are you?"}
      </h2>
      <p className="mt-1.5 text-sm text-ink-muted">
        {lang === "es"
          ? "Requerido por reguladores financieros para proteger tu dinero."
          : "Required by financial regulators to protect your money."}
      </p>

      <div className="mt-5 space-y-3">
        <Input placeholder={lang === "es" ? "Nombre completo" : "Full name"} className="h-11" />
        <Input placeholder={lang === "es" ? "Fecha de nacimiento" : "Date of birth"} className="h-11" />
        <Input placeholder={lang === "es" ? "Número de identificación" : "ID number"} className="h-11" />

        <button
          onClick={() => setCaptured(true)}
          className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/50 text-ink-muted hover:border-brand hover:text-brand"
        >
          {captured ? (
            <>
              <CheckCircle2 className="h-8 w-8 text-success" />
              <p className="text-xs font-medium text-success">
                {lang === "es" ? "Selfie capturada" : "Selfie captured"}
              </p>
            </>
          ) : (
            <>
              <Camera className="h-7 w-7" />
              <p className="text-xs font-medium">
                {lang === "es" ? "Tomar selfie de verificación" : "Take verification selfie"}
              </p>
            </>
          )}
        </button>
      </div>

      <Button onClick={onNext} disabled={!captured} className="mt-auto h-12 w-full rounded-lg bg-brand text-brand-foreground hover:opacity-90 disabled:opacity-40">
        {lang === "es" ? "Continuar" : "Continue"}
      </Button>
    </div>
  );
}

function StepLink({ linked, setLinked, onNext }: { linked: string | null; setLinked: (s: string) => void; onNext: () => void }) {
  const { lang } = useI18n();
  const wallets = ["RappiPay", "Mercado Pago", "Nequi", "DaviPlata", "PIX", lang === "es" ? "Otro banco" : "Other bank"];
  return (
    <div className="flex flex-1 flex-col">
      <h2 className="text-2xl font-bold tracking-tight text-ink">
        {lang === "es" ? "Conecta tu dinero" : "Link your money"}
      </h2>
      <p className="mt-1.5 text-sm text-ink-muted">
        {lang === "es" ? "Elige tu wallet o banco principal." : "Pick your main wallet or bank."}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {wallets.map((w) => (
          <button
            key={w}
            onClick={() => setLinked(w)}
            className={`flex h-20 flex-col items-center justify-center rounded-xl border-2 text-sm font-semibold transition-colors ${
              linked === w
                ? "border-brand bg-brand/5 text-brand"
                : "border-border bg-surface text-ink hover:border-brand/40"
            }`}
          >
            {w}
            {linked === w && (
              <span className="mt-1 text-[10px] font-medium text-success">
                {lang === "es" ? "•• 4821 conectada" : "•• 4821 linked"}
              </span>
            )}
          </button>
        ))}
      </div>

      <Button onClick={onNext} disabled={!linked} className="mt-auto h-12 w-full rounded-lg bg-brand text-brand-foreground hover:opacity-90 disabled:opacity-40">
        {lang === "es" ? "Continuar" : "Continue"}
      </Button>
    </div>
  );
}

function StepGoal({ age, setAge, target, setTarget, rate, format, onNext }: { age: number; setAge: (n: number) => void; target: number; setTarget: (n: number) => void; rate: number; format: (n: number) => string; onNext: () => void }) {
  const { lang } = useI18n();
  // Required monthly to reach target with 5.5% over (age-31) years
  const years = Math.max(1, age - 31);
  const r = 0.055 / 12;
  const fvNeeded = (target * 12) / 0.04; // SWR
  const monthlyNeeded = (fvNeeded * r) / (Math.pow(1 + r, years * 12) - 1);
  const aggressive = monthlyNeeded > 400;

  return (
    <div className="flex flex-1 flex-col">
      <h2 className="text-2xl font-bold tracking-tight text-ink">
        {lang === "es" ? "Tu meta de retiro" : "Your retirement goal"}
      </h2>

      <div className="mt-6 rounded-xl border border-border bg-surface p-4">
        <p className="text-xs text-ink-muted">{lang === "es" ? "Quiero retirarme a los" : "I want to retire at"}</p>
        <p className="mt-1 text-3xl font-bold text-ink num">{age}</p>
        <Slider value={[age]} min={55} max={75} step={1} onValueChange={(v) => setAge(v[0])} className="mt-3" />
      </div>

      <div className="mt-3 rounded-xl border border-border bg-surface p-4">
        <p className="text-xs text-ink-muted">{lang === "es" ? "Quiero recibir cada mes" : "I want each month"}</p>
        <p className="mt-1 text-3xl font-bold text-ink num">{format(target)}</p>
        <Slider value={[target * rate]} min={100 * rate} max={3000 * rate} step={50 * rate} onValueChange={(v) => setTarget(v[0] / rate)} className="mt-3" />
      </div>

      <div className={`mt-4 rounded-xl border p-4 ${aggressive ? "border-warning bg-warning/5" : "border-brand bg-brand/5"}`}>
        <p className="text-xs text-ink-muted">
          {lang === "es" ? "Para lograrlo necesitarías ahorrar:" : "To reach this you'd need to save:"}
        </p>
        <p className="mt-1 text-2xl font-bold text-ink num">
          {format(Math.round(monthlyNeeded))}/{lang === "es" ? "mes" : "mo"}
        </p>
        {aggressive && (
          <p className="mt-1.5 text-[11px] text-warning">
            {lang === "es" ? "Es ambicioso pero alcanzable con consistencia." : "Ambitious but reachable with consistency."}
          </p>
        )}
      </div>

      <Button onClick={onNext} className="mt-auto h-12 w-full rounded-lg bg-brand text-brand-foreground hover:opacity-90">
        {lang === "es" ? "Continuar" : "Continue"}
      </Button>
    </div>
  );
}

function StepRule({ rule, setRule, onNext, format }: { rule: string | null; setRule: (s: string) => void; onNext: () => void; format: (n: number) => string }) {
  const { lang } = useI18n();
  const [done, setDone] = useState(false);
  const opts = [
    { id: "percent", title: lang === "es" ? "Un % de cada pago que recibo" : "% of each payment I get", sub: lang === "es" ? "Recomendado" : "Recommended", est: 80 },
    { id: "round_up", title: lang === "es" ? "Redondear cada compra" : "Round up each purchase", sub: "", est: 18 },
    { id: "fixed", title: lang === "es" ? "Cantidad fija semanal" : "Fixed weekly amount", sub: "", est: 100 },
    { id: "manual", title: lang === "es" ? "Yo deposito manualmente" : "I'll deposit manually", sub: "", est: 0 },
  ];

  if (done) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <Confetti />
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="h-12 w-12" strokeWidth={1.75} />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-ink">
          {lang === "es" ? "¡Estás listo!" : "You're set up!"}
        </h2>
        <p className="mt-2 max-w-xs text-sm text-ink-muted">
          {lang === "es" ? "Tu ingreso proyectado de retiro es" : "Your projected retirement income is"}
        </p>
        <p className="mt-2 text-4xl font-bold text-brand num">{format(528)}/{lang === "es" ? "mes" : "mo"}</p>
        <Button onClick={onNext} className="mt-10 h-12 w-full max-w-xs rounded-lg bg-brand text-brand-foreground hover:opacity-90">
          {lang === "es" ? "Ir a mi panel" : "Go to my dashboard"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <h2 className="text-2xl font-bold tracking-tight text-ink">
        {lang === "es" ? "¿Cómo vas a ahorrar?" : "How will you save?"}
      </h2>

      <div className="mt-5 space-y-2.5">
        {opts.map((o) => (
          <button
            key={o.id}
            onClick={() => setRule(o.id)}
            className={`w-full rounded-xl border-2 p-4 text-left transition-colors ${
              rule === o.id ? "border-brand bg-brand/5" : "border-border bg-surface hover:border-brand/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">{o.title}</p>
              {o.sub && (
                <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                  {o.sub}
                </span>
              )}
            </div>
            {o.est > 0 && (
              <p className="mt-1 text-xs text-ink-muted">
                {lang === "es" ? "Estimado:" : "Estimated:"} {format(o.est)}/{lang === "es" ? "mes" : "mo"}
              </p>
            )}
          </button>
        ))}
      </div>

      <Button onClick={() => setDone(true)} disabled={!rule} className="mt-auto h-12 w-full rounded-lg bg-brand text-brand-foreground hover:opacity-90 disabled:opacity-40">
        {lang === "es" ? "Finalizar" : "Finish"}
      </Button>
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 24 });
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {pieces.map((_, i) => (
        <span
          key={i}
          className="absolute top-0 h-2 w-2 rounded-sm"
          style={{
            left: `${(i * 9) % 100}%`,
            backgroundColor: i % 2 ? "var(--accent)" : "var(--brand)",
            animation: `fall ${1.5 + (i % 5) * 0.3}s ease-in ${(i % 7) * 0.08}s forwards`,
            transform: "translateY(-20px)",
          }}
        />
      ))}
      <style>{`@keyframes fall { to { transform: translateY(110vh) rotate(540deg); opacity: 0.2; } }`}</style>
    </div>
  );
}
