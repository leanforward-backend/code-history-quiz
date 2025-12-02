import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="w-full flex justify-center">
        <Card className="w-full max-w-[40rem] aspect-square flex flex-col justify-center items-center">
          <CardHeader className="flex flex-col items-center gap-4 w-full">
            <CardTitle className="text-5xl font-bold text-center mb-28">
              Code History Quiz
            </CardTitle>
            <motion.div
              initial={{ opacity: 0, x: -90 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="text-4xl text-center text-primary font-bold">
                HOW GOOD IS
              </h2>
              <h2 className="text-3xl text-center font-bold">
                YOUR CODE HISTORY KNOWLEDGE?
              </h2>
            </motion.div>
          </CardHeader>
          <CardContent className="mt-6">
            <Button
              onClick={handleStartQuiz}
              className="text-2xl px-8 py-6 h-auto bg-primary text-white hover:bg-primary/90 hover:text-white"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
