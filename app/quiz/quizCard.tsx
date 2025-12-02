import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { animate, motion, useMotionValue } from "motion/react";
import { useState } from "react";
import { QuizQuestions } from "./quizQuestions";

export const QuizCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);

  const rotateY = useMotionValue(0);
  const x = useMotionValue(0);
  const opacity = useMotionValue(1);

  const currentQuestion = QuizQuestions[currentIndex % QuizQuestions.length];
  const isCorrect = userAnswer === currentQuestion.answer;

  const handleAnswer = async (answer: boolean) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setUserAnswer(answer);

    await animate(rotateY, [0, -35, 195, 180], {
      duration: 1.4,
      times: [0, 0.1, 0.75, 1],
      ease: [0.25, 0.46, 0.45, 1],
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await animate(x, [0, -200, 800], { duration: 0.8, ease: "easeInOut" });
    opacity.set(0);

    setCurrentIndex((prev) => prev + 1);
    setUserAnswer(null);
    rotateY.set(0);
    x.set(-500);
    opacity.set(1);

    await animate(x, 0, { duration: 0.5, ease: "easeOut" });
    setIsAnimating(false);
  };

  return (
    <div className="w-full flex justify-center" style={{ perspective: 1000 }}>
      <motion.div
        style={{
          rotateY,
          x,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className="relative w-160 h-160"
      >
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold mb-8">
                Question {currentIndex + 1}
              </CardTitle>
              <CardDescription className="text-center text-3xl text-purple-900 mb-2">
                {currentQuestion.question}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row gap-1 w-full justify-center align-bottom pt-70">
                <Button
                  variant="outline"
                  className="w-1/2 bg-red-400 text-white text-4xl h-30 hover:bg-red-500 hover:text-white"
                  onClick={() => handleAnswer(true)}
                >
                  TRUE
                </Button>
                <Button
                  variant="outline"
                  className="w-1/2 bg-red-400 text-white text-4xl h-30 hover:bg-red-500 hover:text-white"
                  onClick={() => handleAnswer(false)}
                >
                  FALSE
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div
          className="absolute w-full h-full backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Card
            className={`w-full h-full ${
              isCorrect ? "bg-green-400" : "bg-red-600"
            }`}
          >
            <CardHeader className="h-full flex flex-col justify-center items-center">
              <CardTitle className="text-center text-5xl font-bold mb-8 text-white">
                {isCorrect ? "CORRECT!" : "INCORRECT"}
              </CardTitle>
              <CardDescription className="text-center text-3xl text-white mb-2">
                The answer was {currentQuestion.answer ? "TRUE" : "FALSE"}
                <p className="text-center text-2xl text-white mt-8">
                  {currentQuestion.description}
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};
