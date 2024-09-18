import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
   const [leaderboard, setLeaderboard] = useState<any[]>([]);

   useEffect(() => {
      const fetchLeaderboard = async () => {
         const q = query(
            collection(db, "leaderboard"),
            orderBy("score", "desc")
         );
         const querySnapshot = await getDocs(q);
         const leaderboardData = querySnapshot.docs.map((doc) => doc.data());
         setLeaderboard(leaderboardData);
      };

      fetchLeaderboard();
   }, []);

   return (
      <div className="flex flex-col items-center justify-center h-screen">
         <h1 className="text-4xl font-bold mb-6">Leaderboard</h1>
         <ul className="space-y-4">
            {leaderboard.map((entry, index) => (
               <li key={index} className="text-lg">
                  {entry.username}: {entry.score} points
               </li>
            ))}
         </ul>
      </div>
   );
}
