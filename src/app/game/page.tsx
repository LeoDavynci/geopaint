"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import Timer from "@/components/Timer";
import { fetchQuestion, removeRandomTile } from "@/lib/gameLogic";
import Question from "@/components/Question";
import TileBank from "@/components/TileBank";
import Money from "@/components/Money";
import Score from "@/components/Score";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { storage } from "../../../firebase";
import { ref, uploadString } from "firebase/storage";
import { toPng } from "html-to-image";

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

type TileType = keyof typeof tileCosts;

interface Tile {
   type: TileType;
}

const GRID_SIZE = 30;
const INITIAL_MONEY = 0;
const MONEY_TIMEOUT = 10;

export default function GamePage() {
   const time = 300;
   const router = useRouter();
   const [difficulty, setDifficulty] = useState("medium");
   const [question, setQuestion] = useState<QuestionData | null>(null);
   const [score, setScore] = useState<number>(0);
   const [timeLeft, setTimeLeft] = useState<number>(time);
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
   const [moneyTimeout, setMoneyTimeout] = useState<number>(MONEY_TIMEOUT);

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const difficultyParam = params.get("difficulty") || "medium";
      setDifficulty(difficultyParam);
   }, []);

   const getNewQuestion = async () => {
      try {
         const newQuestion = await fetchQuestion(difficulty);
         setQuestion(newQuestion);
      } catch (error) {
         console.error("Failed to fetch question", error);
      }
   };

   const handleAnswerSubmit = (isCorrect: boolean): void => {
      if (isCorrect) {
         const reward = 5;
         setMoney((prevMoney) => prevMoney + reward);
         setMoneyTimeout(MONEY_TIMEOUT);
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
      return Math.floor(tileCosts[tileType]);
   };

   const handleTilePlace = (row: number, col: number) => {
      if (gameOver) return;

      const currentTile = grid[row][col];

      if (currentTile.type !== "empty") {
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
         setMoneyTimeout(MONEY_TIMEOUT);
      } else if (
         selectedTileType &&
         selectedTileType !== "empty" &&
         money >= tileCosts[selectedTileType]
      ) {
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
         setMoneyTimeout(MONEY_TIMEOUT);
      }
   };

   const handleGameEnd = (): void => {
      setGameOver(true);
   };

   const saveArt = async () => {
      const gridElement = document.getElementById("grid");

      if (!gridElement) {
         console.error("Grid element not found");
         return;
      }

      try {
         const dataUrl = await toPng(gridElement);
         console.log(dataUrl);

         const artRef = ref(storage, `artworks/${Date.now()}.png`);
         await uploadString(artRef, dataUrl, "data_url");

         goToMainMenu();
      } catch (error) {
         console.error("Error saving image", error);
      }
   };

   const goToMainMenu = () => {
      router.push("/main");
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
      if (moneyTimeout > 0 && !gameOver && money > 0) {
         const moneyTimer = setInterval(() => {
            setMoneyTimeout((prev) => prev - 1);
         }, 1000);
         return () => clearInterval(moneyTimer);
      } else if (moneyTimeout === 0) {
         setMoney(0);
      }
   }, [moneyTimeout, gameOver, money]);

   useEffect(() => {
      getNewQuestion();
   }, []);

   if (gameOver) {
      return (
         <div className="flex flex-col items-center justify-center min-h-screen px-4 black">
            <h1 className="text-4xl font-bold mb-4">Game Over!</h1>
            <p className="text-2xl mb-4">Your final score: {score}</p>
            <Map grid={grid} onTilePlace={() => {}} gameOver={true} />
            <div className="center flex-row gap-4">
               <Button
                  className="bg-white text-black mt-4 px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={() => window.location.reload()}
               >
                  <p className="text-xl">Play Again</p>
               </Button>
               <Button
                  className="bg-white text-black mt-4 px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={saveArt}
               >
                  <p className="text-xl">Save Art</p>
               </Button>
               <Button
                  className="bg-white text-black mt-4 px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={goToMainMenu}
               >
                  <p className="text-xl">Main Menu</p>
               </Button>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen px-32 pt-32 background-gradient">
         <Suspense fallback={<div>Loading game...</div>}>
            <div className="flex flex-row center">
               <div className="flex justify-between w-1/2 center">
                  <Map
                     grid={grid}
                     onTilePlace={handleTilePlace}
                     gameOver={false}
                  />
               </div>
               <div className="flex flex-col w-1/2 p-4 gap-4 h-full">
                  <div className="flex justify-between w-full">
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
                  <div className="center w-full bg-gray-100 rounded-lg">
                     <TileBank
                        onTileSelect={(tileType: TileType) =>
                           setSelectedTileType(tileType)
                        }
                        tileCosts={tileCosts}
                        money={money}
                     />
                  </div>
                  <div className="w-full h-1/2">
                     {question && (
                        <Question
                           questionData={question}
                           onSubmit={handleAnswerSubmit}
                        />
                     )}
                  </div>
               </div>
            </div>
         </Suspense>
      </div>
   );
}
