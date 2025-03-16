import DashboardNavbar from "@/features/dashboard/components/navigation";
import { auth, type Session } from "@/lib/auth"; 
import { headers } from "next/headers";
import React from "react";
import { SessionProvider } from "@/app/providers/session-provider";

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const session: Session | null = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <SessionProvider session={session}>
      <div>
        <DashboardNavbar />
        <main className="pt-[69px]">{children}</main>
      </div>
    </SessionProvider>
  );
}
