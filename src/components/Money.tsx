import React from "react";

interface MoneyProps {
   amount: number;
}

const Money: React.FC<MoneyProps> = ({ amount }) => {
   return (
      <div className="text-2xl font-bold text-black">
         <span className="font-bold text-black">Tiles: </span>
         {amount}
      </div>
   );
};

export default Money;
