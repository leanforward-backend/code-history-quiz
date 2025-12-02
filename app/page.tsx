"use client";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { HomePage } from "./homepage/homepage";
import { StartAnimation } from "./startAnimation/startAnimation";

export default function Home() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans dark:bg-black p-4">
      <main className="flex w-full flex-col items-center justify-center">
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
