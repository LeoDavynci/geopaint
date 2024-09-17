import { useState } from "react";
import { Button } from "./ui/button";

type QuestionProps = {
   questionText: string;
   options: string[];
   onAnswerSubmit: (answer: string) => void;
};

const Question = ({ questionText, options, onAnswerSubmit }: QuestionProps) => {
   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

   return (
      <div className="p-4 bg-white shadow-md rounded-lg space-y-4">
         <h2 className="text-2xl font-semibold">{questionText}</h2>
         <div className="flex flex-col space-y-2">
            {options.map((option, index) => (
               <Button
                  key={index}
                  className={`${
                     selectedAnswer === option ? "bg-blue-500" : "bg-gray-200"
                  } px-4 py-2 rounded-lg text-black`}
                  onClick={() => setSelectedAnswer(option)}
               >
                  {option}
               </Button>
            ))}
         </div>
         <Button
            onClick={() => selectedAnswer && onAnswerSubmit(selectedAnswer)}
            className="bg-green-500 text-white mt-4"
         >
            Submit
         </Button>
      </div>
   );
};

export default Question;
