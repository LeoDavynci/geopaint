// lib/gameLogic.js
import { db } from "@/firebase"; // Assume Firebase is set up

// Fetch a random geography question
export async function fetchQuestion() {
   const questions = [
      {
         questionText: "What is the capital of France?",
         options: ["Paris", "London", "Berlin"],
         correctAnswer: "Paris",
      },
      // Add more questions...
   ];
   return questions[Math.floor(Math.random() * questions.length)];
}

// Save the score to the database
export async function saveScore(score) {
   const user = auth.currentUser;
   if (user) {
      await setDoc(doc(db, "leaderboard", user.uid), {
         username: user.email,
         score: score,
         timestamp: new Date(),
      });
      console.log("Score saved successfully");
   }
}
