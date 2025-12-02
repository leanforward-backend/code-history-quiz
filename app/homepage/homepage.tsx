import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useState } from "react";

export const HomePage = ({ startQuiz }: { startQuiz: () => void }) => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const transition = {
    duration: 0.8,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01],
  };

  const box = {
    width: 100,
    height: 100,
    backgroundColor: "#ff0088",
    borderRadius: 5,
  };

  const handleStartQuiz = () => {
    startQuiz();
    setTimeout(() => {
      setIsQuizStarted(true);
      console.log("Quiz started");
    }, 5000);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 border-2 border-red-500">
        <h1>Homepage</h1>
        <motion.div
          initial={{ opacity: 0, x: -29 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2> How good is you're code history knowledge?</h2>
        </motion.div>
        <Button onClick={handleStartQuiz}>Start Quiz</Button>
      </div>
    </>
  );
};
