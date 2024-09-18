"use client"; // This page needs to be client-side as it uses hooks

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Question from "@/components/Question"; // Component to display a question
import Timer from "@/components/Timer"; // Timer component
import ScoreDisplay from "@/components/ScoreDisplay"; // Component to display the score
import { fetchQuestion, saveScore } from "@/lib/gameLogic"; // Custom functions to handle game logic

// Dynamically import Map component to avoid SSR issues
const Map = dynamic(() => import("@/components/GameMap"), { ssr: false });

// Define types for question data
interface QuestionData {
   question: string;
   correct_answer: string;
   incorrect_answers: string[];
   image?: string; // Optional image
}

export default function GamePage() {
   // State variables with appropriate types
   const [question, setQuestion] = useState<QuestionData | null>(null); // Current question
   const [score, setScore] = useState<number>(0); // Current score (countries conquered)
   const [timeLeft, setTimeLeft] = useState<number>(300); // 5-minute timer (300 seconds)
   const [gameOver, setGameOver] = useState<boolean>(false); // To track if the game is over

   // Fetch a new question when the game starts
   const getNewQuestion = async (): Promise<void> => {
      const newQuestion = await fetchQuestion(); // Fetch the question from the server (Open Trivia DB and Unsplash)
      setQuestion(newQuestion);
   };

   // Handle answer submission
   const handleAnswerSubmit = (isCorrect: boolean): void => {
      if (isCorrect) {
         setScore((prev) => prev + 1); // Update score if the answer is correct
      }
      getNewQuestion(); // Fetch the next question
   };

   // Handle game end
   const handleGameEnd = (): void => {
      setGameOver(true);
      saveScore(score); // Save the score (to Firebase or another storage)
   };

   // Timer logic
   useEffect(() => {
      if (timeLeft > 0 && !gameOver) {
         const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
         }, 1000);
         return () => clearInterval(timer); // Clear interval on component unmount
      } else if (timeLeft === 0) {
         handleGameEnd(); // End the game when the timer reaches 0
      }
   }, [timeLeft, gameOver]);

   useEffect(() => {
      getNewQuestion(); // Fetch the first question when the component loads
   }, []);

   if (gameOver) {
      return (
         <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Game Over!</h1>
            <p className="text-2xl">You conquered {score} countries!</p>
            <button
               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
               onClick={() => window.location.reload()} // Simple reload to start the game again
            >
               Play Again
            </button>
         </div>
      );
   }

   return (
      <div className="flex flex-col items-center justify-center h-screen">
         {/* Timer Display */}
         <Timer timeLeft={timeLeft} />

         {/* Map Display */}
         {/* <Map conqueredCountries={score} /> */}

         {/* Question Component */}
         {question && (
            <Question questionData={question} onSubmit={handleAnswerSubmit} />
         )}

         {/* Score Display */}
         <ScoreDisplay score={score} />
      </div>
   );
}
