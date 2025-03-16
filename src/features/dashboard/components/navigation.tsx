"use client";

import Image from "next/image";
import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import { useSession } from "@/app/providers/session-provider";

export default function DashboardNavbar() {
  const session = useSession();

  if (!session) {
    return null;
  }

  const user = session.user;

  return (
    <nav className="fixed flex w-full items-center border-b justify-between font-medium backdrop-blur-sm">
      <div className="p-4 flex items-center justify-center gap-3">
        <Image src={"/logo.svg"} alt="ymir logo" width={20} height={20} />
        <div className="flex items-baseline">
          <h1 className="text-xl uppercase">YMIR</h1>
          <span className="text-muted underline-offset-2 transition-all duration-500 hover:text-muted-foreground hover:underline">
            .dev
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center text-muted-foreground gap-6">
          <Link href="#" className="text-primary">
            Upgrade
          </Link>
          <Link href="#">Feedback</Link>
          <Link href="#">Support</Link>
        </div>

        <div className="p-4 border-l border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center">
              <p>{user.name.charAt(0).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <FaAngleRight className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </nav>
  );
}
