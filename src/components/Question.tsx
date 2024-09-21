import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import he from "he";

function shuffleArray(array: string[]): string[] {
   return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
}

function getHintOptions(correct: string, incorrect: string[]): Set<string> {
   // Randomly pick one incorrect answer and combine it with the correct answer
   const randomIncorrect =
      incorrect[Math.floor(Math.random() * incorrect.length)];
   return new Set([correct, randomIncorrect]);
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
   const [hintUsed, setHintUsed] = useState<boolean>(false);
   const [hintedOptions, setHintedOptions] = useState<Set<string>>(new Set());

   useEffect(() => {
      const allOptions = [
         ...questionData.incorrect_answers,
         questionData.correct_answer,
      ];
      setShuffledOptions(shuffleArray(allOptions));
      setHintUsed(false); // Reset hint usage when the question changes
      setHintedOptions(new Set()); // Reset hint options when question changes
   }, [questionData]);

   const handleSubmit = (selectedOption: string) => {
      const isCorrect = selectedOption === questionData.correct_answer;
      onSubmit(isCorrect);
   };

   const useHint = () => {
      const optionsToKeep = getHintOptions(
         questionData.correct_answer,
         questionData.incorrect_answers
      );
      setHintedOptions(optionsToKeep); // Set the options to keep visible
      setHintUsed(true); // Disable hint button after use
   };

   return (
      <div className="center flex-col p-4 bg-gray-100 h-96 rounded-lg gap-2 justify-between">
         {/* Question Section */}
         <div className="w-full h-1/3">
            <h2 className="text-2xl font-bold text-black">
               {he.decode(questionData.question)}
            </h2>
         </div>

         {/* Hint Button */}
         <div>
            <Button onClick={useHint} disabled={hintUsed}>
               {hintUsed ? "Hint Used" : "Use Hint (50/50)"}
            </Button>
         </div>

         {/* Answers Section with consistent spacing */}
         <div className="w-full flex flex-wrap gap-4">
            {shuffledOptions.map((option, index) => (
               <Button
                  key={index}
                  onClick={() => handleSubmit(option)}
                  className={`bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-400 w-full ${
                     hintUsed && !hintedOptions.has(option)
                        ? "visibility-hidden" // Hide options that are not part of the hint
                        : ""
                  }`}
               >
                  <p className="text-black">{he.decode(option)}</p>
               </Button>
            ))}
         </div>
      </div>
   );
}
