"use client";

import { createContext, useContext, ReactNode } from "react";
import type { Session } from "@/lib/auth";

const SessionContext = createContext<Session | null>(null);

interface SessionProviderProps {
  session: Session | null;
  children: ReactNode;
}

export function SessionProvider({ session, children }: SessionProviderProps) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): Session | null {
  return useContext(SessionContext);
}
