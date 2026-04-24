import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Currency = "USD" | "MXN" | "COP" | "BRL";

// Fixed mock FX rates: 1 USD = X
const RATES: Record<Currency, number> = {
  USD: 1,
  MXN: 17.2,
  COP: 4050,
  BRL: 5.05,
};

const LOCALES: Record<Currency, string> = {
  USD: "en-US",
  MXN: "es-MX",
  COP: "es-CO",
  BRL: "pt-BR",
};

interface CurrencyCtx {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (usd: number, opts?: { compact?: boolean; decimals?: number }) => string;
  symbol: string;
  rate: number;
}

const Ctx = createContext<CurrencyCtx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCur] = useState<Currency>("USD");
  useEffect(() => {
    const s = typeof window !== "undefined" ? (localStorage.getItem("rf.currency") as Currency | null) : null;
    if (s && s in RATES) setCur(s);
  }, []);
  const setCurrency = (c: Currency) => {
    setCur(c);
    if (typeof window !== "undefined") localStorage.setItem("rf.currency", c);
  };
  const format = (usd: number, opts?: { compact?: boolean; decimals?: number }) => {
    const v = usd * RATES[currency];
    const decimals = opts?.decimals ?? (currency === "COP" ? 0 : 0);
    if (opts?.compact) {
      return new Intl.NumberFormat(LOCALES[currency], {
        style: "currency",
        currency,
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(v);
    }
    return new Intl.NumberFormat(LOCALES[currency], {
      style: "currency",
      currency,
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    }).format(v);
  };
  const symbol = new Intl.NumberFormat(LOCALES[currency], { style: "currency", currency })
    .formatToParts(0)
    .find((p) => p.type === "currency")?.value ?? "$";
  return (
    <Ctx.Provider value={{ currency, setCurrency, format, symbol, rate: RATES[currency] }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCurrency() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCurrency outside provider");
  return c;
}
