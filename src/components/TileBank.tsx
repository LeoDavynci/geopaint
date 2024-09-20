import React from "react";

interface TileBankProps {
   tilesLeft: number; // Number of tiles left to drag
}

const TileBank: React.FC<TileBankProps> = ({ tilesLeft }) => {
   const tileTypes = ["land", "water", "sand"]; // Types of available tiles

   const handleDragStart = (
      event: React.DragEvent<HTMLDivElement>,
      tileType: string
   ) => {
      event.dataTransfer.setData("tileType", tileType); // Store the tile type in the drag event
   };

   return (
      <div className="flex space-x-4 p-4 bg-gray-100 rounded-lg mt-4">
         {tileTypes.map((tileType, index) => (
            <div
               key={index}
               className={`tile ${tileType} w-16 h-16 flex items-center justify-center cursor-pointer ${
                  tilesLeft > 0 ? "opacity-100" : "opacity-50"
               }`}
               draggable={tilesLeft > 0} // Only allow dragging if tilesLeft > 0
               onDragStart={(event) => handleDragStart(event, tileType)}
               style={{
                  backgroundColor:
                     tileType === "land"
                        ? "green"
                        : tileType === "water"
                        ? "blue"
                        : "yellow", // Colors based on the tile type
                  border: "1px solid black",
               }}
            >
               <p className="text-white font-bold">
                  {tileType.charAt(0).toUpperCase() + tileType.slice(1)}
               </p>
            </div>
         ))}
      </div>
   );
};

export default TileBank;
