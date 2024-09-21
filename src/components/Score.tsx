import React from "react";

interface MoneyProps {
   score: number;
}

const Money: React.FC<MoneyProps> = ({ score }) => {
   return (
      <div className="text-2xl font-bold text-black">
         <span className="font-bold text-black">Score: </span>
         {score}
      </div>
   );
};

export default Money;
