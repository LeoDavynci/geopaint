"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MainPage() {
   const router = useRouter(); // Move this to the top, before other logic
   const [difficulty, setDifficulty] = useState("medium");

   const handlePlayGame = () => {
      router.push(`/game?difficulty=${difficulty}`);
   };

   const handleLeaderboard = () => {
      router.push("/gallary");
   };

   return (
      <div className="flex flex-col items-center justify-center h-screen background-gradient">
         <h1 className="text-7xl font-bold mb-6 text-white">GEOPAINT</h1>
         <div className="mt-8 center gap-8">
            <select
               value={difficulty}
               onChange={(e) => setDifficulty(e.target.value)}
               className="bg-white px-4 py-2 text-black rounded-lg"
            >
               <option value="easy">Easy</option>
               <option value="medium">Medium</option>
               <option value="hard">Hard</option>
            </select>
            <Button
               className="bg-white px-6 py-4 hover:bg-gray-400"
               onClick={handlePlayGame}
            >
               <p className="text-black text-lg">Play Game</p>
            </Button>

            <Button
               className="bg-white px-8 py-4 hover:bg-gray-400"
               onClick={handleLeaderboard}
            >
               <p className="text-black text-lg">Gallary</p>
            </Button>
         </div>
      </div>
   );
}
