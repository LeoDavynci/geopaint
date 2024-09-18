// app/main/page.tsx
import { useRouter } from "next/navigation";

import Tabs from "@/components/Tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MainPage() {
   const router = useRouter();
   const [isAuthenticated, setIsAuthenticated] = useState(false); // Update this based on actual authentication logic

   const handlePlayGame = () => {
      router.push("/game");
   };

   const handleLoginSignup = () => {
      router.push("/auth"); // Navigate to the authentication page
   };

   return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
         <h1 className="text-5xl font-bold mb-6">Welcome to GeoConquer</h1>
         <Tabs />

         <div className="mt-8">
            {/* Main Play Button */}
            <Button
               className="bg-blue-500 text-white px-6 py-3 rounded-lg text-2xl"
               onClick={handlePlayGame}
            >
               Play Game
            </Button>
         </div>

         {/* Show Login/Signup or Account */}
         <div className="mt-6">
            {!isAuthenticated ? (
               <Button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleLoginSignup}
               >
                  Login / Sign Up
               </Button>
            ) : (
               <Button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => router.push("/account")}
               >
                  View Account
               </Button>
            )}
         </div>
      </div>
   );
}
