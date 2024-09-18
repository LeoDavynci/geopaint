import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Question({ questionData, onSubmit }) {
   const [selectedAnswer, setSelectedAnswer] = useState(null);

   const handleSubmit = () => {
      const isCorrect = selectedAnswer === questionData.correctAnswer;
      onSubmit(isCorrect); // Pass whether the answer is correct or not
   };

   return (
      <div className="p-4 bg-white shadow-md rounded-lg space-y-4">
         <h2 className="text-2xl font-bold">{questionData.questionText}</h2>
         <div className="space-y-2">
            {questionData.options.map((option, index) => (
               <Button
                  key={index}
                  onClick={() => setSelectedAnswer(option)}
                  className={`${
                     selectedAnswer === option ? "bg-blue-500" : "bg-gray-200"
                  } px-4 py-2 rounded-lg`}
               >
                  {option}
               </Button>
            ))}
         </div>
         <Button
            onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
         >
            Submit Answer
         </Button>
      </div>
   );
}
