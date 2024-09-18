// components/Tabs.tsx
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Tabs() {
   const router = useRouter();

   return (
      <div className="flex justify-center space-x-4 mb-8">
         <Button
            className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300"
            onClick={() => router.push("/leaderboard")}
         >
            Leaderboard
         </Button>
         <Button
            className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300"
            onClick={() => router.push("/account")}
         >
            Account
         </Button>
         <Button
            className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300"
            onClick={() => router.push("/game")}
         >
            Play Game
         </Button>
      </div>
   );
}
