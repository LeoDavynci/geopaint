export default function Timer({ timeLeft }) {
   const minutes = Math.floor(timeLeft / 60);
   const seconds = timeLeft % 60;

   return (
      <div className="text-2xl font-bold">
         Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
   );
}
