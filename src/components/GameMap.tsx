import React, { useState, useRef, useEffect } from "react";

const tileCosts = {
   Red: 1,
   Orange: 1,
   Yellow: 1,
   Lime: 1,
   Green: 1,
   LightBlue: 1,
   Blue: 1,
   Purple: 1,
   Pink: 1,
   Brown: 1,
   Black: 1,
   White: 1,
   Gray: 1,
} as const;

type TileType = keyof typeof tileCosts | "empty";

interface Tile {
   type: TileType;
}

interface GameMapProps {
   grid: Tile[][];
   onTilePlace: (row: number, col: number) => void;
   gameOver: boolean;
}

const tileColors: Record<TileType, string> = {
   empty: "bg-white",
   Red: "bg-red-500",
   Orange: "bg-orange-500",
   Yellow: "bg-yellow-500",
   Lime: "bg-lime-500",
   Green: "bg-green-500",
   LightBlue: "bg-blue-200",
   Blue: "bg-blue-500",
   Purple: "bg-purple-500",
   Pink: "bg-pink-500",
   Brown: "bg-amber-700",
   Black: "bg-black",
   White: "bg-white",
   Gray: "bg-gray-500",
};

const GameMap: React.FC<GameMapProps> = ({ grid, onTilePlace, gameOver }) => {
   const [scale, setScale] = useState(1);
   const [panning, setPanning] = useState(false);
   const [position, setPosition] = useState({ x: 0, y: 0 });
   const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
   const containerRef = useRef<HTMLDivElement>(null);

   return (
      <div
         className="overflow-hidden"
         style={{
            width: "100%",
            maxWidth: "600px",
            height: "600px",
            position: "relative",
         }}
         ref={containerRef}
      >
         <div
            id="grid" // <-- Add this ID so the grid can be captured
            className="grid absolute"
            style={{
               gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`,
               width: `${100 * scale}%`,
               height: `${100 * scale}%`,
            }}
         >
            {grid.map((row, rowIndex) =>
               row.map((tile, colIndex) => (
                  <div
                     key={`${rowIndex}-${colIndex}`}
                     className={`aspect-square ${tileColors[tile.type]} ${
                        !gameOver ? "cursor-pointer hover:bg-gray-200" : ""
                     } ${
                        !gameOver && tile.type !== "empty"
                           ? "hover:ring-2 hover:ring-black"
                           : ""
                     } ${
                        gameOver && tile.type === "empty"
                           ? "bg-transparent"
                           : ""
                     }`}
                     onClick={() =>
                        !gameOver && onTilePlace(rowIndex, colIndex)
                     }
                  />
               ))
            )}
         </div>
      </div>
   );
};

export default GameMap;
