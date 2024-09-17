import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import Map from "@/components/Map";

// Import Map dynamically to avoid SSR issues with Leaflet.js

const Game = () => {
   const [question, setQuestion] = useState<string | null>(null);
   const [score, setScore] = useState<number>(0);
   const [timeLeft, setTimeLeft] = useState<number>(300); // Timer (5 minutes)

   useEffect(() => {
      // Timer countdown logic
      const interval = setInterval(() => {
         setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
   }, []);

   const handleAnswerSubmit = (answer: string) => {
      // Handle answer submission logic
      if (answer === "correct") {
         setScore((prev) => prev + 1);
         // Fetch new question here
      } else {
         // Optionally, show an alert for incorrect answers
      }
   };

   return (
      <div className="flex flex-col items-center justify-center h-screen bg-white space-y-4">
         <h1 className="text-3xl font-bold">Time Left: {timeLeft}s</h1>
         <Map />
         <div className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">
               {question || "Loading question..."}
            </h2>
            <Button
               className="bg-green-500 text-white"
               onClick={() => handleAnswerSubmit("correct")}
            >
               Submit Answer
            </Button>
         </div>
         <Alert className="w-full max-w-lg">
            Your current score is {score}
         </Alert>
      </div>
   );
};

export default Game;
