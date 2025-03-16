import LandingHero from "@/features/landing/components/hero";
import LandingNavbar from "@/features/landing/components/navigation";
import React from "react";

export default function LandingPage() {
  return (
    <div>
      <LandingNavbar />
      <LandingHero />
    </div>
  );
}
