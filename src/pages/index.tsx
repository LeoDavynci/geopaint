import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const Home = () => {
   const router = useRouter();

   const handleStartGame = () => {
      router.push("/game");
   };

   return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
         <h1 className="text-4xl font-bold mb-4">GeoConquer</h1>
         <p className="text-lg text-gray-600 mb-8">
            Conquer countries by answering geography trivia!
         </p>
         <Button
            onClick={handleStartGame}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
         >
            Start Game
         </Button>
      </div>
   );
};

export default Home;
