import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { QuizCard } from "../quiz/quizCard";

export const StartAnimation = () => {
  const countdown = [3, 2, 1, "Go!"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < countdown.length) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [index, countdown.length]);

  if (index >= countdown.length) {
    return <QuizCard />;
  }

  return (
    <div className="w-full flex justify-center">
      <Card className="w-full max-w-[40rem] aspect-square flex flex-col justify-center items-center">
        <h2 className="text-background px-4 py-2 rounded text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-8">
          READY?
        </h2>
        {index >= countdown.length && <QuizCard />}
        <motion.span
          key={countdown[index]}
          initial={{ scale: 4.5, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0.7 }}
          exit={{ scale: 0.1, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl sm:text-7xl md:text-9xl text-primary text-foreground font-bold"
        >
          {countdown[index]}
        </motion.span>
      </Card>
    </div>
  );
};
