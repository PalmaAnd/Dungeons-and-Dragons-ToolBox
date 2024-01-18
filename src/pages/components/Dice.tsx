// components/Dice.tsx

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
      className={`dice-button ${result === null ? "rolling" : ""}`}
      onClick={generateResult}
      aria-label={`Roll D${sides}. ${result !== null ? `Last Result: ${result}` : "Click to roll the dice"}`}
      onKeyDown={(e) => e.key === 'Enter' && generateResult()}
      tabIndex={0}
    >
      <h3 className="text-2xl font-bold">{`D${sides}`}</h3>
      <div className="text-lg">Result: {result}</div>
    </button>
  );
};

export default Dice;