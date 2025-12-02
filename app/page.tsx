"use client";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { HomePage } from "./homepage/homepage";
import { StartAnimation } from "./startAnimation/startAnimation";

export default function Home() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <AnimatePresence mode="wait">
          {isQuizStarted ? (
            <StartAnimation />
          ) : (
            <HomePage startQuiz={() => setIsQuizStarted(true)} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
