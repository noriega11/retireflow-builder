// Seeded mock data for RetireFlow. All money values are in USD.

export type KycStatus = "pending" | "approved" | "rejected" | "escalated";
export type ChurnRisk = "low" | "med" | "high";
export type AutosaveType = "percent" | "round_up" | "fixed_weekly" | "manual";

export interface Saver {
  id: string;
  name: string;
  partnerId: string;
  country: string;
  kyc: KycStatus;
  balance: number;
  retirementAge: number;
  targetMonthlyIncome: number;
  projected: { conservative: number; expected: number; optimistic: number };
  cadence: AutosaveType;
  lastDeposit: string; // ISO date
  joinedAt: string;
  churn: ChurnRisk;
  age: number;
}

export interface Partner {
  id: string;
  name: string;
  country: string;
  stage: "Applied" | "Diligence" | "Contracted" | "Integrated" | "Live";
  aum: number;
  activeSavers: number;
  revenueSharePct: number;
  health: number; // 0-100
  contractedAt: string;
  liveAt?: string;
  monthlyDeposits: number;
}

export interface DepositRow {
  id: string;
  saverId: string;
  amount: number;
  type: "manual" | "auto" | "round_up";
  date: string;
  source: string;
  retirementIncomeAdded: number;
}

export interface Fund {
  id: string;
  name: string;
  custodian: string;
  yieldPct: number;
  durationYears: number;
  allocationPct: number;
  balance: number;
}

// Deterministic pseudo-random
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const r = rand(42);

export const partners: Partner[] = [
  { id: "p1", name: "RappiPay", country: "MX", stage: "Live", aum: 4_820_000, activeSavers: 78, revenueSharePct: 30, health: 92, contractedAt: "2023-08-12", liveAt: "2023-11-04", monthlyDeposits: 142_300 },
  { id: "p2", name: "Nequi", country: "CO", stage: "Live", aum: 3_410_000, activeSavers: 32, revenueSharePct: 28, health: 86, contractedAt: "2024-01-20", liveAt: "2024-04-18", monthlyDeposits: 98_700 },
  { id: "p3", name: "PicPay", country: "BR", stage: "Live", aum: 2_180_000, activeSavers: 10, revenueSharePct: 25, health: 74, contractedAt: "2024-05-02", liveAt: "2024-08-14", monthlyDeposits: 61_400 },
  { id: "p4", name: "Mercado Pago", country: "AR", stage: "Integrated", aum: 0, activeSavers: 0, revenueSharePct: 30, health: 80, contractedAt: "2025-09-01", monthlyDeposits: 0 },
  { id: "p5", name: "DaviPlata", country: "CO", stage: "Contracted", aum: 0, activeSavers: 0, revenueSharePct: 27, health: 75, contractedAt: "2025-10-15", monthlyDeposits: 0 },
  { id: "p6", name: "Ualá", country: "AR", stage: "Diligence", aum: 0, activeSavers: 0, revenueSharePct: 28, health: 70, contractedAt: "—", monthlyDeposits: 0 },
  { id: "p7", name: "Tropipay", country: "PA", stage: "Applied", aum: 0, activeSavers: 0, revenueSharePct: 25, health: 60, contractedAt: "—", monthlyDeposits: 0 },
];

const FIRST = ["María", "José", "Ana", "Carlos", "Lucía", "Pedro", "Sofía", "Diego", "Camila", "Andrés", "Valentina", "Mateo", "Isabella", "Juan", "Daniela", "Luis", "Paula", "Javier", "Mariana", "Ricardo"];
const LAST = ["González", "Rodríguez", "Pérez", "Silva", "Martínez", "López", "Hernández", "Torres", "Ramírez", "Flores", "Castro", "Vargas", "Mendoza", "Rojas", "Cruz"];

const cadences: AutosaveType[] = ["percent", "round_up", "fixed_weekly", "manual"];
const kycs: KycStatus[] = ["approved", "approved", "approved", "approved", "pending", "escalated", "rejected"];
const churns: ChurnRisk[] = ["low", "low", "low", "med", "med", "high"];

export const savers: Saver[] = Array.from({ length: 120 }, (_, i) => {
  const fn = FIRST[Math.floor(r() * FIRST.length)];
  const ln = LAST[Math.floor(r() * LAST.length)];
  const partner = partners[Math.floor(r() * 3)]; // distribute across the 3 live ones
  const balance = Math.round(200 + r() * 18000);
  const expected = Math.round(120 + (balance / 18000) * 1400);
  return {
    id: `s${i + 1}`,
    name: `${fn} ${ln}`,
    partnerId: partner.id,
    country: partner.country,
    kyc: kycs[Math.floor(r() * kycs.length)],
    balance,
    retirementAge: 60 + Math.floor(r() * 10),
    targetMonthlyIncome: 400 + Math.floor(r() * 1200),
    projected: {
      conservative: Math.round(expected * 0.78),
      expected,
      optimistic: Math.round(expected * 1.28),
    },
    cadence: cadences[Math.floor(r() * cadences.length)],
    lastDeposit: new Date(Date.now() - Math.floor(r() * 30) * 86400000).toISOString(),
    joinedAt: new Date(Date.now() - Math.floor(r() * 600) * 86400000).toISOString(),
    churn: churns[Math.floor(r() * churns.length)],
    age: 22 + Math.floor(r() * 30),
  };
});

// The "current" saver for the Saver app
export const currentSaver: Saver = {
  ...savers[0],
  name: "María González",
  balance: 2840,
  retirementAge: 65,
  targetMonthlyIncome: 800,
  projected: { conservative: 412, expected: 528, optimistic: 678 },
  cadence: "percent",
  age: 31,
  kyc: "approved",
};

// 18 months of AUM time series
export function aumSeries(): { month: string; aum: number; deposits: number; p1: number; p2: number; p3: number }[] {
  const months: string[] = [];
  const now = new Date();
  for (let i = 17; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleDateString("en-US", { month: "short", year: "2-digit" }));
  }
  return months.map((m, i) => {
    const t = i / 17;
    const aum = Math.round(800_000 + t * 9_600_000 + Math.sin(i / 2) * 120_000);
    return {
      month: m,
      aum,
      deposits: Math.round(60_000 + t * 240_000 + Math.cos(i) * 15_000),
      p1: Math.round(aum * 0.46),
      p2: Math.round(aum * 0.33),
      p3: Math.round(aum * 0.21),
    };
  });
}

// Recent deposits for the saver
export const recentDeposits: DepositRow[] = [
  { id: "d1", saverId: "s1", amount: 25, type: "auto", date: new Date(Date.now() - 86400000).toISOString(), source: "RappiPay •• 4821", retirementIncomeAdded: 4.2 },
  { id: "d2", saverId: "s1", amount: 1.45, type: "round_up", date: new Date(Date.now() - 2 * 86400000).toISOString(), source: "Round-up", retirementIncomeAdded: 0.24 },
  { id: "d3", saverId: "s1", amount: 50, type: "manual", date: new Date(Date.now() - 5 * 86400000).toISOString(), source: "RappiPay •• 4821", retirementIncomeAdded: 8.4 },
  { id: "d4", saverId: "s1", amount: 25, type: "auto", date: new Date(Date.now() - 8 * 86400000).toISOString(), source: "RappiPay •• 4821", retirementIncomeAdded: 4.2 },
  { id: "d5", saverId: "s1", amount: 0.78, type: "round_up", date: new Date(Date.now() - 9 * 86400000).toISOString(), source: "Round-up", retirementIncomeAdded: 0.13 },
  { id: "d6", saverId: "s1", amount: 25, type: "auto", date: new Date(Date.now() - 15 * 86400000).toISOString(), source: "RappiPay •• 4821", retirementIncomeAdded: 4.2 },
  { id: "d7", saverId: "s1", amount: 100, type: "manual", date: new Date(Date.now() - 22 * 86400000).toISOString(), source: "RappiPay •• 4821", retirementIncomeAdded: 16.8 },
  { id: "d8", saverId: "s1", amount: 25, type: "auto", date: new Date(Date.now() - 29 * 86400000).toISOString(), source: "RappiPay •• 4821", retirementIncomeAdded: 4.2 },
];

export const funds: Fund[] = [
  { id: "f1", name: "BlackRock LATAM Fixed Income", custodian: "BNY Mellon", yieldPct: 6.2, durationYears: 3.4, allocationPct: 38, balance: 3_800_000 },
  { id: "f2", name: "Vanguard EM Government Bonds", custodian: "State Street", yieldPct: 5.7, durationYears: 5.1, allocationPct: 27, balance: 2_700_000 },
  { id: "f3", name: "JPM Short-Term USD Treasury", custodian: "BNY Mellon", yieldPct: 5.1, durationYears: 1.2, allocationPct: 22, balance: 2_200_000 },
  { id: "f4", name: "Santander LATAM Corporate", custodian: "Santander", yieldPct: 6.8, durationYears: 4.0, allocationPct: 13, balance: 1_300_000 },
];

// Projection math: simple compound, 12-period yearly
export function projectBalance(monthly: number, years: number, annualRate: number, startBalance = 0): number[] {
  const r = annualRate / 12;
  let bal = startBalance;
  const series: number[] = [];
  for (let m = 0; m <= years * 12; m++) {
    if (m > 0) bal = bal * (1 + r) + monthly;
    if (m % 12 === 0) series.push(Math.round(bal));
  }
  return series;
}

// Convert a final balance to monthly income using 4% safe withdrawal rule
export function balanceToMonthlyIncome(balance: number): number {
  return (balance * 0.04) / 12;
}
