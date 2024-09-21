import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import he from "he";

function shuffleArray(array: string[]): string[] {
   return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
}

interface QuestionProps {
   questionData: {
      question: string;
      correct_answer: string;
      incorrect_answers: string[];
      image?: string;
   };
   onSubmit: (isCorrect: boolean) => void;
}

export default function Question({ questionData, onSubmit }: QuestionProps) {
   const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

   useEffect(() => {
      const allOptions = [
         ...questionData.incorrect_answers,
         questionData.correct_answer,
      ];
      setShuffledOptions(shuffleArray(allOptions));
   }, [questionData]);

   const handleSubmit = (selectedOption: string) => {
      const isCorrect = selectedOption === questionData.correct_answer;
      onSubmit(isCorrect);
   };

   return (
      <div className="center flex-col p-4 bg-gray-100 shadow-md rounded-lg gap-4">
         <h2 className="text-2xl font-bold text-black">
            {he.decode(questionData.question)}
         </h2>

         <div className="space-y-2">
            {shuffledOptions.map((option, index) => (
               <Button
                  key={index}
                  onClick={() => handleSubmit(option)} // Pass the option directly to handleSubmit
                  className={`bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-400`}
               >
                  <p className="text-black">{option}</p>
               </Button>
            ))}
         </div>
      </div>
   );
}
