// app/main/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MainPage() {
   const router = useRouter();
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const handlePlayGame = () => {
      router.push("/game");
   };

   const handleLoginSignup = () => {
      router.push("/auth");
   };

   const handleLeaderboard = () => {
      router.push("/leaderboard");
   };

   return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
         <h1 className="text-5xl font-bold mb-6 text-black">GeoDraw</h1>
         <div className="mt-8 center gap-8">
            {/* Main Play Button */}
            <Button className="" onClick={handlePlayGame}>
               Play Game
            </Button>

            <Button className="" onClick={handleLeaderboard}>
               History
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
