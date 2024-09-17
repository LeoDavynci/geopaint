import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/router";

const Scoreboard = () => {
   const router = useRouter();
   const { score } = router.query;

   return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
         <Card className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold text-center">Game Over</h1>
            <p className="text-xl text-center mt-4">Your Score: {score}</p>
            <Button
               className="bg-blue-500 text-white mt-6"
               onClick={() => router.push("/")}
            >
               Play Again
            </Button>
         </Card>
      </div>
   );
};

export default Scoreboard;
