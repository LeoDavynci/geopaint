import React from "react";

interface Tile {
   type: string; // 'empty', 'land', 'water', 'sand', etc.
}

interface GameMapProps {
   grid: Tile[][]; // Pass the grid from the parent component
   onTilePlace: (row: number, col: number, tileType: string) => void; // Function to handle tile placement
}

const GameMap = ({ grid, onTilePlace }: GameMapProps) => {
   const handleDrop = (
      event: React.DragEvent<HTMLDivElement>,
      row: number,
      col: number
   ) => {
      event.preventDefault();
      const tileType = event.dataTransfer.getData("tileType"); // Get the dragged tile type
      if (grid[row][col].type === "empty" && tileType) {
         onTilePlace(row, col, tileType); // Call the function to place the tile in this specific cell
      }
   };

   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault(); // Allow drag over empty tiles
   };

   return (
      <div className="grid grid-cols-10 gap-1">
         {grid.map((row, rowIndex) =>
            row.map((tile, colIndex) => (
               <div
                  key={`${rowIndex}-${colIndex}`} // Unique key for each tile
                  className={`tile ${tile.type}`}
                  onDrop={(event) => handleDrop(event, rowIndex, colIndex)} // Handle tile drop for the specific cell
                  onDragOver={handleDragOver} // Allow drag over empty tiles
                  style={{
                     width: "30px",
                     height: "30px",
                     border: "1px solid black",
                     backgroundColor:
                        tile.type === "empty"
                           ? "white"
                           : tile.type === "land"
                           ? "green"
                           : tile.type === "water"
                           ? "blue"
                           : "yellow",
                  }}
               />
            ))
         )}
      </div>
   );
};

export default GameMap;
