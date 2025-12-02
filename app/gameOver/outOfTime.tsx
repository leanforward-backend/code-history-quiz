import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OutOfTimeProps {
  onTryAgain: () => void;
}

export const OutOfTime = ({ onTryAgain }: OutOfTimeProps) => {
  return (
    <Card className="w-full h-full bg-red-600">
      <CardHeader className="h-full flex flex-col justify-center items-center">
        <CardTitle className="text-center text-5xl font-bold mb-8 text-white mt-2">
          GAME OVER
        </CardTitle>
        <CardDescription className="text-center text-3xl text-white mb-8">
          You ran out of time!
        </CardDescription>
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
