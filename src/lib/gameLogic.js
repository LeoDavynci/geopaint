let questionCache = [];

export async function fetchQuestion(difficulty) {
   try {
      if (questionCache.length > 0) {
         return questionCache.shift();
      }

      const questionResponse = await fetch(
         `https://opentdb.com/api.php?amount=10&category=22&difficulty=${difficulty}&type=multiple`
      );

      if (!questionResponse.ok) {
         throw new Error(
            `Failed to fetch questions: ${questionResponse.status}`
         );
      }

      const questionData = await questionResponse.json();
      if (!questionData.results || questionData.results.length === 0) {
         throw new Error("No questions returned from Open Trivia Database");
      }

      questionCache = questionData.results;
      return questionCache.shift();
   } catch (error) {
      console.error("Error fetching question:", error.message);
      throw error;
   }
}

export function removeRandomTile(grid) {
   const filledTiles = [];
   for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
         if (grid[row][col].type !== "empty") {
            filledTiles.push({ row, col });
         }
      }
   }

   if (filledTiles.length > 0) {
      const randomIndex = Math.floor(Math.random() * filledTiles.length);
      const randomTile = filledTiles[randomIndex];
      const newGrid = grid.map((row, rowIndex) =>
         row.map((tile, colIndex) =>
            rowIndex === randomTile.row && colIndex === randomTile.col
               ? { type: "empty" }
               : tile
         )
      );
      return { newGrid, removedTile: true };
   }

   return { newGrid: grid, removedTile: false };
}
