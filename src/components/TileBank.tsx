import React from "react";

const tileCosts = {
   empty: 0,
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

type TileType = keyof typeof tileCosts;

interface TileBankProps {
   onTileSelect: (tileType: TileType) => void;
   tileCosts: typeof tileCosts;
   money: number;
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

const TileBank: React.FC<TileBankProps> = ({
   onTileSelect,
   tileCosts,
   money,
}) => {
   const tileTypes = Object.keys(tileCosts) as TileType[];

   return (
      <div className="bg-gray-100 flex flex-wrap justify-center gap-2 p-4  rounded-lg max-w-md">
         {tileTypes.map((tileType) => (
            <button
               key={tileType}
               className={`tile ${tileColors[tileType]} w-12 h-12 rounded-lg
            ${
               money >= tileCosts[tileType]
                  ? "cursor-pointer hover:opacity-75"
                  : "opacity-50 cursor-not-allowed"
            }`}
               onClick={() =>
                  money >= tileCosts[tileType] && onTileSelect(tileType)
               }
               disabled={money < tileCosts[tileType]}
            />
         ))}
      </div>
   );
};

export default TileBank;
