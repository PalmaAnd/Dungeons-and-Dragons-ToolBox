// pages/generator.tsx

import { useState } from "react";

const GeneratorPage = () => {
  const [diceResult, setDiceResult] = useState<number | null>(null);

  const handleGenerateClick = (dice:number) => {
    const result = Math.floor(Math.random() * dice) + 1;
    setDiceResult(result);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2c2d35] to-[#3f0101]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            onClick={() => handleGenerateClick(4)}
          >
            <h3 className="text-2xl font-bold">D4</h3>
            <div className="text-lg">{diceResult && <p className="result">Result: {diceResult}</p>}</div>
          </div>
          <div
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            onClick={() => handleGenerateClick(6)}
          >
            <h3 className="text-2xl font-bold">D6</h3>
            <div className="text-lg">{diceResult && <p className="result">Result: {diceResult}</p>}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GeneratorPage;
