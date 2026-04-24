import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en";

type Dict = Record<string, { es: string; en: string }>;

const dict: Dict = {
  // global
  "app.name": { es: "RetireFlow", en: "RetireFlow" },
  "app.tagline": { es: "Tu retiro, automático y flexible.", en: "Your retirement, automatic and flexible." },
  "role.saver": { es: "Ahorrador", en: "Saver" },
  "role.partner": { es: "Socio", en: "Partner" },
  "role.operator": { es: "Operador", en: "Operator" },
  "role.switch": { es: "Cambiar rol", en: "Switch role" },
  "trust.footer": {
    es: "Regulado por CNBV • Fondos en custodia segregada • Cobertura tipo SIPC hasta $250,000",
    en: "Regulated by CNBV • Funds held in segregated custody • SIPC-equivalent coverage up to $250,000",
  },

  // saver tabs
  "tab.home": { es: "Inicio", en: "Home" },
  "tab.save": { es: "Ahorrar", en: "Save" },
  "tab.projection": { es: "Proyección", en: "Future" },
  "tab.rewards": { es: "Recompensas", en: "Rewards" },
  "tab.activity": { es: "Actividad", en: "Activity" },
  "tab.profile": { es: "Perfil", en: "Profile" },

  // saver home
  "home.heroLabel": { es: "Ingreso mensual proyectado al retirarte", en: "Projected monthly income at retirement" },
  "home.range": { es: "Rango", en: "Range" },
  "home.balance": { es: "Ahorrado hoy", en: "Saved today" },
  "home.progress": { es: "Progreso a meta", en: "Progress to goal" },
  "home.nextDeposit": { es: "Próximo depósito automático", en: "Next automatic deposit" },
  "home.change": { es: "Cambiar", en: "Change" },
  "home.recent": { es: "Actividad reciente", en: "Recent activity" },
  "home.tipTitle": { es: "¿Por qué empezar hoy importa más que cuánto ahorras?", en: "Why starting today beats how much you save" },
  "home.deposit": { es: "Depositar", en: "Deposit" },

  // save
  "save.title": { es: "Hacer un depósito", en: "Make a deposit" },
  "save.preview": { es: "Este depósito suma", en: "This deposit adds" },
  "save.toRetire": { es: "/mes a tu retiro", en: "/month to your retirement" },
  "save.source": { es: "Origen", en: "Source" },
  "save.cta": { es: "Depositar", en: "Deposit" },
  "save.successTitle": { es: "¡Depósito completado!", en: "Deposit completed!" },
  "save.successSub": { es: "Tu retiro proyectado ahora es", en: "Your projected retirement is now" },
  "save.again": { es: "Otro depósito", en: "Another deposit" },
  "save.home": { es: "Volver al inicio", en: "Back home" },

  // projection
  "proj.title": { es: "Simulador de retiro", en: "Retirement simulator" },
  "proj.monthly": { es: "Ahorro mensual", en: "Monthly savings" },
  "proj.age": { es: "Edad de retiro", en: "Retirement age" },
  "proj.assumptions": { es: "Supuestos", en: "Assumptions" },
  "proj.scenarios": { es: "Escenarios", en: "Scenarios" },
  "proj.startToday": { es: "Empezar hoy", en: "Start today" },
  "proj.wait1": { es: "Esperar 1 año", en: "Wait 1 year" },
  "proj.wait5": { es: "Esperar 5 años", en: "Wait 5 years" },
  "proj.share": { es: "Compartir con un asesor", en: "Share with an advisor" },

  // partner
  "partner.overview": { es: "Resumen", en: "Overview" },
  "partner.savers": { es: "Ahorradores", en: "Savers" },
  "partner.campaigns": { es: "Campañas", en: "Campaigns" },
  "partner.integration": { es: "Integración", en: "Integration" },
  "partner.revenue": { es: "Ingresos", en: "Revenue" },
  "partner.team": { es: "Equipo", en: "Team" },
  "partner.sandbox": { es: "MODO SANDBOX", en: "SANDBOX MODE" },

  // admin
  "admin.pulse": { es: "Pulso", en: "Pulse" },
  "admin.partners": { es: "Socios", en: "Partners" },
  "admin.savers": { es: "Ahorradores", en: "Savers" },
  "admin.funds": { es: "Fondos", en: "Funds" },
  "admin.compliance": { es: "Cumplimiento", en: "Compliance" },
  "admin.finance": { es: "Finanzas", en: "Finance" },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("rf.lang")) as Lang | null;
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("rf.lang", l);
  };
  const t = (key: string) => dict[key]?.[lang] ?? key;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n outside provider");
  return c;
}
