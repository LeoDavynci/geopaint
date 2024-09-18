// src/lib/gameLogic.js

let questionCache = [];

export async function fetchQuestion() {
   try {
      // If we have cached questions, return the first one
      if (questionCache.length > 0) {
         return questionCache.shift();
      }

      // Fetch question from Open Trivia Database
      const questionResponse = await fetch(
         "https://opentdb.com/api.php?amount=1&category=22&type=multiple"
      );

      if (!questionResponse.ok) {
         throw new Error(
            `Failed to fetch questions: ${questionResponse.status}`
         );
      }

      const questionData = await questionResponse.json();

      // Check if results exist and are not empty
      if (!questionData.results || questionData.results.length === 0) {
         throw new Error("No questions returned from Open Trivia Database");
      }

      // Store the fetched questions in the cache
      questionCache = questionData.results;

      return questionCache.shift();
   } catch (error) {
      console.error("Error fetching question:", error.message);
      throw error; // Rethrow the error for handling in the component
   }
}

export async function saveScore(score) {
   // Save the score logic here (e.g., save to Firebase or local storage)
}
