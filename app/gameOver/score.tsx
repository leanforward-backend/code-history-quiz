import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ScoreProps {
  correct: number;
  incorrect: number;
  onTryAgain: () => void;
}

export const Score = ({ correct, incorrect, onTryAgain }: ScoreProps) => {
  return (
    <Card className="w-full h-full bg-blue-600">
      <CardHeader className="h-full flex flex-col justify-center items-center">
        <CardTitle className="text-center text-5xl font-bold mb-8 text-white mt-2">
          GAME OVER
        </CardTitle>
        <CardDescription className="text-center text-3xl text-white mb-4">
          You finished the quiz!
        </CardDescription>
        <div className="flex flex-col gap-2 mb-8">
          <p className="text-2xl text-white">Correct: {correct}</p>
          <p className="text-2xl text-white">Incorrect: {incorrect}</p>
        </div>
        <CardContent>
          <Button
            variant="secondary"
            className="text-2xl px-8 py-6"
            onClick={onTryAgain}
          >
            Try Again
          </Button>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
