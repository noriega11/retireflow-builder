import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "saver" | "partner" | "operator";

interface RoleCtx {
  role: Role;
  setRole: (r: Role) => void;
  userName: string;
}

const Ctx = createContext<RoleCtx | null>(null);

const NAMES: Record<Role, string> = {
  saver: "María González",
  partner: "Equipo RappiPay",
  operator: "Admin RetireFlow",
};

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("saver");
  useEffect(() => {
    const s = typeof window !== "undefined" ? (localStorage.getItem("rf.role") as Role | null) : null;
    if (s === "saver" || s === "partner" || s === "operator") setRoleState(s);
  }, []);
  const setRole = (r: Role) => {
    setRoleState(r);
    if (typeof window !== "undefined") localStorage.setItem("rf.role", r);
  };
  return <Ctx.Provider value={{ role, setRole, userName: NAMES[role] }}>{children}</Ctx.Provider>;
}

export function useRole() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useRole outside provider");
  return c;
}
