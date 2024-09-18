// pages/api/images.ts
import { NextApiRequest, NextApiResponse } from "next";

// Define the structure of the Unsplash API response that we're using
interface UnsplashResponse {
   results: Array<{
      urls: {
         small: string;
      };
   }>;
}

async function fetchImageOfCountry(
   country: string
): Promise<string | undefined> {
   const UNSPLASH_ACCESS_KEY =
      "guPMo2HFQ3tkrPo2P3MC5n9W6OYCC-7c5E0n8FssmP4" as string; // Safely access the environment variable
   const response = await fetch(
      `https://api.unsplash.com/search/photos?query=landmark+${country}&client_id=${UNSPLASH_ACCESS_KEY}`
   );

   const data: UnsplashResponse = await response.json();

   return data.results[0]?.urls?.small; // Return the first image URL or undefined if no result
}

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const { country } = req.query;

   if (!country || typeof country !== "string") {
      return res
         .status(400)
         .json({ error: "Country is required and must be a string" });
   }

   try {
      const imageUrl = await fetchImageOfCountry(country);
      if (!imageUrl) {
         return res
            .status(404)
            .json({ error: "No image found for the country" });
      }
      return res.status(200).json({ imageUrl });
   } catch (error) {
      return res.status(500).json({ error: "Failed to fetch image" });
   }
}
