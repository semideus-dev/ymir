import Navbar from "@/components/global/navbar";
import Sidebar from "@/components/global/sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <div className="flex h-full w-full">
        <section className="fixed left-0 top-0 hidden h-full overflow-y-auto lg:block lg:w-[264px] bg-zinc-100">
          <Sidebar />
        </section>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto h-full max-w-screen-2xl">
            <Navbar />
            <section className="flex h-full flex-col px-6 py-8">
              {children}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
