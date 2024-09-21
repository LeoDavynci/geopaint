// app/main/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MainPage() {
   const router = useRouter(); // Move this to the top, before other logic
   const [difficulty, setDifficulty] = useState("medium");

   const handlePlayGame = () => {
      router.push(`/game?difficulty=${difficulty}`);
   };

   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const handleLeaderboard = () => {
      router.push("/gallary");
   };

   return (
      <div
         className="flex flex-col items-center justify-center h-screen background-gradient"
         // style={{
         //    backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
         //    backgroundSize: "cover",
         //    backgroundPosition: "center",
         // }}
      >
         <h1 className="text-7xl font-bold mb-6 text-white">GEOPAINT</h1>
         <div className="mt-8 center gap-8">
            {/* Main Play Button */}

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
            {/* {!isAuthenticated ? (
               <Button className="" onClick={handleLoginSignup}>
                  Login
               </Button>
            ) : (
               <Button className="">View Account</Button>
            )} */}
         </div>
      </div>
   );
}
