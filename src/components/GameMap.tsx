import React, { useState, useRef, useEffect, useCallback } from "react";

type TileType =
   | "Red"
   | "Orange"
   | "Yellow"
   | "Lime"
   | "Green"
   | "LightBlue"
   | "Blue"
   | "Purple"
   | "Pink"
   | "Brown"
   | "Black"
   | "White"
   | "Gray"
   | "empty";

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

const useDebounce = <T extends (...args: any[]) => void>(
   func: T,
   delay: number
): T => {
   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

   const debouncedFunc = useCallback(
      (...args: Parameters<T>) => {
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
         }

         timeoutRef.current = setTimeout(() => {
            func(...args);
         }, delay);
      },
      [func, delay]
   ) as T;

   useEffect(() => {
      return () => {
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
         }
      };
   }, []);

   return debouncedFunc;
};

const GameMap: React.FC<GameMapProps> = ({ grid, onTilePlace, gameOver }) => {
   const [isDragging, setIsDragging] = useState(false);
   const containerRef = useRef<HTMLDivElement>(null);
   const lastPlacedTileRef = useRef<{ row: number; col: number } | null>(null);

   const debouncedTilePlace = useDebounce((row: number, col: number) => {
      if (
         lastPlacedTileRef.current?.row !== row ||
         lastPlacedTileRef.current?.col !== col
      ) {
         onTilePlace(row, col);
         lastPlacedTileRef.current = { row, col };
      }
   }, 50); // 50ms debounce delay

   const handleMouseDown = (e: React.MouseEvent) => {
      if (gameOver) return;
      setIsDragging(true);
      handleTilePlacement(e);
   };

   const handleMouseMove = (e: React.MouseEvent) => {
      if (isDragging) {
         handleTilePlacement(e);
      }
   };

   const handleMouseUp = () => {
      setIsDragging(false);
      lastPlacedTileRef.current = null;
   };

   const handleTilePlacement = (e: React.MouseEvent) => {
      const gridElement = document.getElementById("grid");
      if (!gridElement) return;

      const rect = gridElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const colWidth = rect.width / grid[0].length;
      const rowHeight = rect.height / grid.length;

      const col = Math.floor(x / colWidth);
      const row = Math.floor(y / rowHeight);

      if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
         debouncedTilePlace(row, col);
      }
   };

   useEffect(() => {
      const handleGlobalMouseUp = () => {
         setIsDragging(false);
         lastPlacedTileRef.current = null;
      };

      window.addEventListener("mouseup", handleGlobalMouseUp);

      return () => {
         window.removeEventListener("mouseup", handleGlobalMouseUp);
      };
   }, []);

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
         onMouseDown={handleMouseDown}
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseUp}
      >
         <div
            id="grid"
            className="grid absolute"
            style={{
               gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`,
               width: "100%",
               height: "100%",
            }}
         >
            {grid.map((row, rowIndex) =>
               row.map((tile, colIndex) => (
                  <div
                     key={`${rowIndex}-${colIndex}`}
                     className={`aspect-square ${tileColors[tile.type]} ${
                        !gameOver ? "cursor-pointer hover:bg-opacity-75" : ""
                     } ${
                        !gameOver && tile.type !== "empty"
                           ? "hover:ring-2 hover:ring-black"
                           : ""
                     } ${
                        gameOver && tile.type === "empty"
                           ? "bg-transparent"
                           : ""
                     }`}
                  />
               ))
            )}
         </div>
      </div>
   );
};

export default GameMap;
