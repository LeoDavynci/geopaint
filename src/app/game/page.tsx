"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Timer from "@/components/Timer";
import { fetchQuestion, saveScore, removeRandomTile } from "@/lib/gameLogic";
import Question from "@/components/Question";
import TileBank from "@/components/TileBank";
import Money from "@/components/Money";
import Score from "@/components/Score";
import { Button } from "@/components/ui/button";

const Map = dynamic(() => import("@/components/GameMap"), { ssr: false });

interface QuestionData {
   question: string;
   correct_answer: string;
   incorrect_answers: string[];
   image?: string;
}

const tileCosts = {
   empty: 0,
   Red: 1,
   Orange: 1,
   Yellow: 1,
   Lime: 1,
   Green: 1,
   LightBlue: 1,
   Blue: 1,
   Purple: 1,
   Pink: 1,
   Brown: 1,
   Black: 1,
   White: 1,
   Gray: 1,
} as const;

type TileType = keyof typeof tileCosts | "empty";

interface Tile {
   type: TileType;
}

const GRID_SIZE = 20;
const INITIAL_MONEY = 0;

export default function GamePage() {
   const [question, setQuestion] = useState<QuestionData | null>(null);
   const [score, setScore] = useState<number>(0);
   const [timeLeft, setTimeLeft] = useState<number>(300);
   const [gameOver, setGameOver] = useState<boolean>(false);
   const [grid, setGrid] = useState<Tile[][]>(() =>
      Array.from({ length: GRID_SIZE }, () =>
         Array(GRID_SIZE).fill({ type: "empty" as const })
      )
   );
   const [money, setMoney] = useState<number>(INITIAL_MONEY);
   const [selectedTileType, setSelectedTileType] = useState<TileType | null>(
      null
   );

   const getNewQuestion = async (): Promise<void> => {
      try {
         const newQuestion = await fetchQuestion();
         setQuestion(newQuestion);
      } catch (error) {
         console.error("Failed to fetch question", error);
      }
   };

   const handleAnswerSubmit = (isCorrect: boolean): void => {
      if (isCorrect) {
         const reward = 5;
         setMoney((prevMoney) => prevMoney + reward);
         setScore((prevScore) => prevScore + 1);
      } else {
         const { newGrid, removedTile } = removeRandomTile(grid);
         if (removedTile) {
            setGrid(newGrid);
         }
      }
      getNewQuestion();
   };

   const getRefundAmount = (tileType: TileType): number => {
      if (tileType === "empty") return 0;
      return Math.floor(tileCosts[tileType]);
   };

   const handleTilePlace = (row: number, col: number) => {
      if (gameOver) return;

      const currentTile = grid[row][col];

      if (currentTile.type !== "empty") {
         // Remove the tile and refund money
         const refundAmount = getRefundAmount(currentTile.type);
         setGrid((prevGrid) =>
            prevGrid.map((r, rowIndex) =>
               rowIndex === row
                  ? r.map((tile, colIndex) =>
                       colIndex === col ? { type: "empty" as const } : tile
                    )
                  : r
            )
         );
         setMoney((prevMoney) => prevMoney + refundAmount);
      } else if (
         selectedTileType &&
         selectedTileType !== "empty" &&
         money >= tileCosts[selectedTileType]
      ) {
         // Place a new tile
         setGrid((prevGrid) =>
            prevGrid.map((r, rowIndex) =>
               rowIndex === row
                  ? r.map((tile, colIndex) =>
                       colIndex === col ? { type: selectedTileType } : tile
                    )
                  : r
            )
         );
         setMoney((prevMoney) => prevMoney - tileCosts[selectedTileType]);
      }
   };

   const handleGameEnd = (): void => {
      setGameOver(true);
      saveScore(score);
   };

   useEffect(() => {
      if (timeLeft > 0 && !gameOver) {
         const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
         }, 1000);
         return () => clearInterval(timer);
      } else if (timeLeft === 0) {
         handleGameEnd();
      }
   }, [timeLeft, gameOver]);

   useEffect(() => {
      getNewQuestion();
   }, []);

   if (gameOver) {
      return (
         <div className="flex flex-col items-center justify-center min-h-screen px-4 testblue">
            <h1 className="text-4xl font-bold mb-4">Game Over!</h1>
            <p className="text-2xl mb-4">Your final score: {score}</p>
            <Map grid={grid} onTilePlace={() => {}} gameOver={true} />
            <button
               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
               onClick={() => window.location.reload()}
            >
               Play Again
            </button>
         </div>
      );
   }

   return (
      <div className=" min-h-screen px-32 pt-32 ">
         <div className="flex flex-row center">
            <div className="flex justify-between w-1/2 center ">
               <Map
                  grid={grid}
                  onTilePlace={handleTilePlace}
                  gameOver={false}
               />
            </div>
            <div className="flex flex-col w-1/2 p-4 gap-4 h-full">
               <div className="flex justify-between w-full ">
                  <div className="rounded-md bg-gray-100 py-2 px-4">
                     <Timer timeLeft={timeLeft} />
                  </div>
                  <div className="rounded-md bg-gray-100 py-2 px-4">
                     <Money amount={money} />
                  </div>
                  <div className="rounded-md bg-gray-100 py-2 px-4">
                     <Score score={score} />
                  </div>
               </div>
               <div className="center w-full">
                  <TileBank
                     onTileSelect={(tileType: TileType) =>
                        setSelectedTileType(tileType)
                     }
                     tileCosts={tileCosts}
                     money={money}
                  />
               </div>
               <div className="center w-full h-1/2"></div>
               {question && (
                  <Question
                     questionData={question}
                     onSubmit={handleAnswerSubmit}
                  />
               )}
            </div>
         </div>
      </div>
   );
}
