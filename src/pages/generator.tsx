// pages/generator.tsx

import { useState } from "react";

const GeneratorPage = () => {
  const [D4, setD4]     = useState<number | null>(null);
  const [D6, setD6]     = useState<number | null>(null);
  const [D8, setD8]     = useState<number | null>(null);
  const [D12, setD12]   = useState<number | null>(null);
  const [D20, setD20]   = useState<number | null>(null);
  const [D100, setD100] = useState<number | null>(null);

  const generateD4 = () => {
    const result = Math.floor(Math.random() * 4) + 1;
    setD4(result);
  };

  const generateD6 = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setD6(result);
  };

  const generateD8 = () => {
    const result = Math.floor(Math.random() * 8) + 1;
    setD8(result);
  };

  const generateD12 = () => {
    const result = Math.floor(Math.random() * 12) + 1;
    setD12(result);
  };

  const generateD20 = () => {
    const result = Math.floor(Math.random() * 20) + 1;
    setD20(result);
  };

  const generateD100 = () => {
    const result = Math.floor(Math.random() * 100) + 1;
    setD100(result);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2c2d35] to-[#3f0101]">
      <div className="container flex items-start gap-12 px-4 py-16 ">
        <section>
          <h3 className="text-2xl font-bold text-white text-center py-4">Dice rolls</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <button
              className="flex max-w-xs gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 items-center"
              onClick={generateD4}
            >
              <h3 className="text-2xl font-bold">D4</h3>
              <div className="text-lg">
                Result: {D4}
              </div>
            </button>
            <button
              className="flex max-w-xs gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 items-center"
              onClick={generateD6}
            >
              <h3 className="text-2xl font-bold">D6</h3>
              <div className="text-lg">
                Result: {D6}
              </div>
            </button>
            <button
              className="flex max-w-xs gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 items-center"
              onClick={generateD8}
            >
              <h3 className="text-2xl font-bold">D8</h3>
              <div className="text-lg">
                Result: {D8}
              </div>
            </button>
            <button
              className="flex max-w-xs gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 items-center"
              onClick={generateD12}
            >
              <h3 className="text-2xl font-bold">D12</h3>
              <div className="text-lg">
                Result: {D12}
              </div>
            </button>
            <button
              className="flex max-w-xs gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 items-center"
              onClick={generateD20}
            >
              <h3 className="text-2xl font-bold">D20</h3>
              <div className="text-lg">
                Result: {D20}
              </div>
            </button>
            <button
              className="flex max-w-xs gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 items-center"
              onClick={generateD100}
            >
              <h3 className="text-2xl font-bold">D100</h3>
              <div className="text-lg">
                Result: {D100}
              </div>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default GeneratorPage;
