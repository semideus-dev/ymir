"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function PricingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 2 } }}
      viewport={{ once: true }}
      className="flex w-[30%] flex-col items-center justify-center"
    >
      <div className="w-full space-y-4 bg-gradient-to-b from-white via-primary to-primary p-4 text-primary-foreground">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col space-y-1">
            <span className="font-semibold">Personal</span>
            <span className="text-sm">Learn and explore our features.</span>
          </div>
          <span>Free</span>
        </div>
        <div className="w-full border-b border-dashed border-zinc-700/30" />
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col space-y-1">
            <span className="font-semibold">Professional</span>
            <span className="text-sm">Unlock the full potential of Ymir.</span>
          </div>
          <span>$19.99/month</span>
        </div>
        <Link href="/sign-in">
          <Button className="w-full bg-background text-primary shadow-lg hover:bg-background">
            Get Started
            <ArrowRight />
          </Button>
        </Link>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#67e8f9"
          fillOpacity="1"
          d="M0,192L34.3,170.7C68.6,149,137,107,206,106.7C274.3,107,343,149,411,186.7C480,224,549,256,617,272C685.7,288,754,288,823,261.3C891.4,235,960,181,1029,154.7C1097.1,128,1166,128,1234,138.7C1302.9,149,1371,171,1406,181.3L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </svg>
    </motion.div>
  );
}
