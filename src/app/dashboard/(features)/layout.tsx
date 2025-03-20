import { Sidebar } from "@/features/dashboard/components/sidebar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default async function DashboardFeaturesLayout({ children }: Props) {
  return (
    <div className="flex flex-1 h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
