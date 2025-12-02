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
import { OutOfTime } from "../gameOver/outOfTime";
import { Score } from "../gameOver/score";
import { Timeline } from "../timeline/timeline";
import { QuizQuestions } from "./quizQuestions";

export const QuizCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [gameState, setGameState] = useState<
    "playing" | "outOfTime" | "completed"
  >("playing");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [gameId, setGameId] = useState(0);

  const rotateY = useMotionValue(0);
  const x = useMotionValue(0);
  const opacity = useMotionValue(1);

  const currentQuestion = QuizQuestions[currentIndex % QuizQuestions.length];
  const isCorrect = userAnswer === currentQuestion.answer;

  const handleTimeUp = async () => {
    if (gameState !== "playing") return;
    setGameState("outOfTime");
    await animate(rotateY, 180, { duration: 0.6 });
  };

  const handleTryAgain = async () => {
    setIsAnimating(true);

    // Slide out current card
    await animate(x, [0, -200, 800], { duration: 0.8, ease: "easeInOut" });
    opacity.set(0);

    // Reset state
    setGameState("playing");
    setCurrentIndex(0);
    setScore({ correct: 0, incorrect: 0 });
    setUserAnswer(null);
    setGameId((prev) => prev + 1);
    rotateY.set(0);
    x.set(-400);
    opacity.set(1);

    // Slide in new card
    await animate(x, 0, { duration: 0.5, ease: "easeOut" });
    setIsAnimating(false);
  };

  const handleAnswer = async (answer: boolean) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setUserAnswer(answer);

    await animate(rotateY, [0, -35, 195, 180], {
      duration: 0.2,
      times: [0, 0.1, 0.75, 1],
      ease: [0.25, 0.46, 0.45, 1],
    });

    await new Promise((resolve) => setTimeout(resolve, 2));

    const newScore = {
      correct: score.correct + (answer === currentQuestion.answer ? 1 : 0),
      incorrect: score.incorrect + (answer === currentQuestion.answer ? 0 : 1),
    };
    setScore(newScore);

    await animate(x, [0, -200, 800], { duration: 0.8, ease: "easeInOut" });
    opacity.set(0);

    if (currentIndex === QuizQuestions.length - 1) {
      setGameState("completed");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }

    setUserAnswer(null);
    rotateY.set(0);
    x.set(-400);
    opacity.set(1);

    await animate(x, 0, { duration: 0.5, ease: "easeOut" });
    setIsAnimating(false);
  };

  return (
    <>
      {gameState === "playing" && (
        <Timeline
          key={gameId}
          currentIndex={currentIndex}
          quizProgress={(currentIndex / QuizQuestions.length) * 100}
          onTimeUp={handleTimeUp}
        />
      )}
      <div className="w-full flex justify-center" style={{ perspective: 1000 }}>
        <motion.div
          style={{
            rotateY,
            x,
            opacity,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full max-w-[40rem] aspect-square"
        >
          <div
            className="absolute w-full h-full backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            {gameState === "completed" ? (
              <Score
                correct={score.correct}
                incorrect={score.incorrect}
                onTryAgain={handleTryAgain}
              />
            ) : (
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle className="text-center text-2xl font-bold mb-8">
                    Question {currentIndex + 1}
                  </CardTitle>
                  <CardDescription className="text-center text-3xl text-background mb-2">
                    {currentQuestion.question}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-full flex flex-col justify-end pb-4 sm:pb-6">
                  {gameState === "playing" && (
                    <div className="flex flex-row gap-1 w-full justify-center px-2">
                      <Button
                        variant="outline"
                        className="flex-1 bg-primary text-white text-lg sm:text-2xl md:text-4xl h-12 sm:h-16 md:h-24 hover:bg-primary/90 hover:text-white"
                        onClick={() => handleAnswer(true)}
                      >
                        TRUE
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 bg-primary text-white text-lg sm:text-2xl md:text-4xl h-12 sm:h-16 md:h-24 hover:bg-primary/90 hover:text-white"
                        onClick={() => handleAnswer(false)}
                      >
                        FALSE
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
          <div
            className="absolute w-full h-full backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {gameState === "outOfTime" ? (
              <OutOfTime onTryAgain={handleTryAgain} />
            ) : (
              <Card
                className={`w-full h-full ${
                  isCorrect ? "bg-green-400" : "bg-red-600"
                }`}
              >
                <CardHeader className="h-full flex flex-col justify-center items-center">
                  <CardTitle className="text-center text-5xl font-bold mb-8 text-white mt-2">
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
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};
