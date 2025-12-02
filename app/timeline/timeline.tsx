import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { QuizQuestions } from "../quiz/quizQuestions";

export const Timeline = ({
  currentIndex,
  quizProgress,
  onTimeUp,
}: {
  currentIndex: number;
  quizProgress: number;
  onTimeUp?: () => void;
}) => {
  const [elapsedTime, setElapsedTime] = useState("0:00");

  useEffect(() => {
    let seconds = 0;
    const interval = setInterval(() => {
      seconds += 1;

      if (seconds > 180) {
        clearInterval(interval);
        onTimeUp?.();
        return;
      }

      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      const formatted = `${minutes}:${secs.toString().padStart(2, "0")}`;
      setElapsedTime(formatted);
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  return (
    <div className="w-full max-w-[40rem]">
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="w-full flex flex-row justify-between text-sm text-gray-500 mb-4">
          <h1 className="text-xl font-bold text-white">
            {currentIndex + 1} of {QuizQuestions.length}
          </h1>
          <div className="flex flex-row gap-2 items-center">
            <h1 className="text-xl font-bold text-primary">ELAPSED TIME</h1>
            <h1 className="text-xl font-bold text-white">{elapsedTime}</h1>
            <h1 className="text-md font-bold text-primary">/ 3:00</h1>
          </div>
        </div>
        <div className="w-full h-2 bg-white rounded-full mb-12 overflow-hidden">
          <motion.div
            className="h-full bg-red-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${quizProgress}%` }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};
