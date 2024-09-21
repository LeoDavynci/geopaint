"use client";

import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ArtworksPage = () => {
   const [artworks, setArtworks] = useState<string[]>([]); // Store image URLs

   const router = useRouter();

   const goToMainMenu = () => {
      router.push("/main");
   };

   useEffect(() => {
      const fetchArtworks = async () => {
         try {
            // Get a reference to the artworks folder
            const artworksRef = ref(storage, "artworks/");

            // List all the items in the folder
            const result = await listAll(artworksRef);

            // Fetch the download URLs for each file
            const urls = await Promise.all(
               result.items.map((itemRef) => getDownloadURL(itemRef))
            );

            setArtworks(urls); // Set the image URLs
         } catch (error) {
            console.error("Error fetching artworks:", error);
         }
      };

      fetchArtworks();
   }, []);

   return (
      <div className="min-h-screen p-8">
         <div className="flex justify-between flex-row gap-6">
            <Button
               className="bg-white text-black mt-4 px-4 py-2 rounded-lg hover:bg-gray-400"
               onClick={goToMainMenu}
            >
               Back
            </Button>
            <h1 className="text-5xl font-bold mb-8">Saved Artworks</h1>
            <div></div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {artworks.map((url, index) => (
               <div key={index} className="border rounded-md shadow-md p-4">
                  <img
                     src={url}
                     alt={`Artwork ${index + 1}`}
                     className="w-full h-auto"
                  />
               </div>
            ))}
         </div>
      </div>
   );
};

export default ArtworksPage;
