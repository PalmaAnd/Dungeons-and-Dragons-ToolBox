// pages/generator.tsx

import { useState } from "react";

const GeneratorPage = () => {
  const [D4, setD4] = useState<number | null>(null);
  const [D6, setD6] = useState<number | null>(null);
  const [D8, setD8] = useState<number | null>(null);

  const generateD4 = () => {
    const result = Math.floor(Math.random() * 4) + 1;
    setD4(result);
  };

  const generateD6 = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setD6(result);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2c2d35] to-[#3f0101]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <button
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            onClick={generateD4}
          >
            <h3 className="text-2xl font-bold">D4</h3>
            <div className="text-lg">Result: {D4 && <p className="result">{D4}</p>}</div>
          </button>
          <button
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            onClick={generateD6}
          >
            <h3 className="text-2xl font-bold">D6</h3>
            <div className="text-lg">Result: {D6 && <p className="result">{D6}</p>}</div>
          </button>
        </div>
      </div>
    </main>
  );
};

export default GeneratorPage;
