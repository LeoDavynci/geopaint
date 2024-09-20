import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
   const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

   useEffect(() => {
      const allOptions = [
         ...questionData.incorrect_answers,
         questionData.correct_answer,
      ];
      setShuffledOptions(shuffleArray(allOptions));
   }, [questionData]);

   const handleSubmit = () => {
      const isCorrect = selectedAnswer === questionData.correct_answer;
      onSubmit(isCorrect);
   };

   return (
      <div className="p-4 bg-white shadow-md rounded-lg space-y-4">
         <h2 className="text-2xl font-bold">{questionData.question}</h2>

         <div className="space-y-2">
            {shuffledOptions.map((option, index) => (
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
            disabled={!selectedAnswer}
            className={`mt-4 ${
               selectedAnswer
                  ? "bg-green-500"
                  : "bg-gray-500 cursor-not-allowed"
            } text-white px-4 py-2 rounded-lg`}
         >
            Submit Answer
         </Button>
      </div>
   );
}
