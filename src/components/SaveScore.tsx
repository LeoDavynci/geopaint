import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export default async function saveScore(score: number) {
   const user = auth.currentUser;
   if (user) {
      const scoreRef = doc(db, "leaderboard", user.uid); // Use UID as a unique identifier
      await setDoc(scoreRef, {
         username: user.email,
         score,
         timestamp: new Date(),
      });
      console.log("Score saved successfully!");
   } else {
      console.error("No user is logged in.");
   }
}
