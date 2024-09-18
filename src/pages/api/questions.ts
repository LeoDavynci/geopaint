import { NextApiRequest, NextApiResponse } from "next";

// Fetch geography questions from Open Trivia Database
async function fetchGeographyQuestions() {
   const response = await fetch(
      "https://opentdb.com/api.php?amount=10&category=22&type=multiple"
   );
   const data = await response.json();
   return data.results;
}

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method === "GET") {
      try {
         const questions = await fetchGeographyQuestions();
         return res.status(200).json(questions);
      } catch (error) {
         return res.status(500).json({ error: "Failed to fetch questions" });
      }
   } else {
      return res.status(405).json({ error: "Method not allowed" });
   }
}
