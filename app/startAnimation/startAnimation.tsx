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
    <div className="flex flex-col items-center justify-center w-full h-screen bg-black">
      <h2 className="text-purple-700 px-4 py-2 rounded text-8xl font-bold mb-8">
        READY?
      </h2>
      {index >= countdown.length && <QuizCard />}
      <motion.span
        key={countdown[index]}
        initial={{ scale: 4.5, opacity: 1 }}
        animate={{ scale: 1.5, opacity: 0.7 }}
        exit={{ scale: 0.1, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white text-9xl font-black"
      >
        {countdown[index]}
      </motion.span>
    </div>
  );
};
