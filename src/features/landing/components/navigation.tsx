"use client";

import { motion } from "motion/react";

import Image from "next/image";
import PricingCard from "@/features/landing/components/pricing-card";

export default function LandingNavbar() {
  return (
    <nav className="fixed flex w-full items-start justify-between px-16 font-medium backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 1 } }}
        viewport={{ once: true }}
        className="my-4 flex items-center justify-center space-x-4"
      >
        <Image
          src={"/logo.svg"}
          alt="ymir logo"
          width={40}
          height={40}
        />
        <div className="flex items-baseline">
          <h1 className="text-3xl uppercase">YMIR</h1>
          <span className="text-muted underline-offset-2 transition-all duration-500 hover:text-muted-foreground hover:underline">
            .dev
          </span>
        </div>
      </motion.div>
      <PricingCard />
    </nav>
  );
}
