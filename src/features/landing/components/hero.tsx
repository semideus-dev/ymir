import React from "react";

import { TextRoll } from "@/components/motion/text-roll";

export default function LandingHero() {
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <TextRoll
        className="text-4xl text-black dark:text-white md:text-6xl"
        variants={{
          enter: {
            initial: { rotateX: 0, filter: "blur(0px)" },
            animate: { rotateX: 90, filter: "blur(2px)" },
          },
          exit: {
            initial: { rotateX: 90, filter: "blur(2px)" },
            animate: { rotateX: 0, filter: "blur(0px)" },
          },
        }}
      >
        Streamline, Collaborate, Succeed.
      </TextRoll>
    </section>
  );
}
