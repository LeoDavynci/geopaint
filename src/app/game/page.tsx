"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Timer from "@/components/Timer";
import { fetchQuestion, saveScore, removeRandomTile } from "@/lib/gameLogic";
import Question from "@/components/Question";
import TileBank from "@/components/TileBank";

const Map = dynamic(() => import("@/components/GameMap"), { ssr: false });

interface QuestionData {
   question: string;
   correct_answer: string;
   incorrect_answers: string[];
   image?: string;
}

interface Tile {
   type: string;
}

export default function GamePage() {
   const [question, setQuestion] = useState<QuestionData | null>(null);
   const [score, setScore] = useState<number>(0);
   const [timeLeft, setTimeLeft] = useState<number>(300);
   const [gameOver, setGameOver] = useState<boolean>(false);
   const [grid, setGrid] = useState<Tile[][]>(
      Array.from({ length: 10 }, () => Array(10).fill({ type: "empty" }))
   );
   const [showTileSelection, setShowTileSelection] = useState<boolean>(false);
   const [tilesLeft, setTilesLeft] = useState<number>(2);
   const [totalTiles, setTotalTiles] = useState<number>(0);

   const getNewQuestion = async (): Promise<void> => {
      try {
         const newQuestion = await fetchQuestion();
         setQuestion(newQuestion);
         setShowTileSelection(false);
      } catch (error) {
         console.error("Failed to fetch question", error);
      }
   };

   const handleAnswerSubmit = (isCorrect: boolean): void => {
      if (isCorrect) {
         setScore((prevScore) => prevScore + 1);
         setShowTileSelection(true);
         setTilesLeft(2);
      } else {
         const { newGrid, removedTile } = removeRandomTile(grid);
         if (removedTile) {
            setGrid(newGrid);
            setTotalTiles((prev) => prev - 1);
         }
         getNewQuestion();
      }
   };

   const handleTilePlace = (row: number, col: number, tileType: string) => {
      if (tilesLeft > 0 && grid[row][col].type === "empty") {
         const updatedGrid = grid.map((r, rowIndex) =>
            rowIndex === row
               ? r.map((tile, colIndex) =>
                    colIndex === col ? { type: tileType } : tile
                 )
               : r
         );
         setGrid(updatedGrid);
         setTilesLeft((prev) => prev - 1);
         setTotalTiles((prev) => prev + 1);
         if (tilesLeft === 1) {
            getNewQuestion();
         }
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
         <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Game Over!</h1>
            <p className="text-2xl">You conquered {totalTiles} tiles!</p>
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
      <div className="flex flex-col items-center justify-center h-screen">
         <Timer timeLeft={timeLeft} />
         <Map grid={grid} onTilePlace={handleTilePlace} />
         {showTileSelection ? (
            <TileBank tilesLeft={tilesLeft} />
         ) : (
            question && (
               <Question
                  questionData={question}
                  onSubmit={handleAnswerSubmit}
               />
            )
         )}
         <h1>Total Tiles: {totalTiles}</h1>
      </div>
   );
}
