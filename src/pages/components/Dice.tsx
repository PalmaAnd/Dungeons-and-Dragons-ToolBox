import React, { useState } from "react";

interface DiceProps {
  sides: number;
}

const Dice: React.FC<DiceProps> = ({ sides }) => {
  const [result, setResult] = useState<number | null>(null);

  const generateResult = () => {
    setResult(null);
    const newResult = Math.floor(Math.random() * sides) + 1;
    setResult(newResult);
  };

  return (
    <button
      className={`w-48 h-32 flex flex-col justify-center items-center rounded-lg p-4 bg-gray-600 ${result === null ? "rolling" : ""}`}
      onClick={generateResult}
      aria-label={`Roll D${sides}. ${result !== null ? `Last Result: ${result}` : "Click to roll the dice"}`}
      onKeyDown={(e) => e.key === 'Enter' && generateResult()}
      tabIndex={0}
    >
      <h3 className="mb-2 text-white">{`D${sides}`}</h3>
      <div className="text-xl text-white">Result: {result}</div>
    </button>
  );
};

export default Dice;