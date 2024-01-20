import React from "react";
import NPCGenerator from "./components/NPCGenerator";

const Players = () => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2c2d35] to-[#3f0101]">
      <div className="container flex items-start gap-12 px-4 py-16">
        <section className="backdrop-brightness-75 w-1/4">
          <h3 className="py-4 text-center text-2xl font-bold text-white">
            NPC Generator
          </h3>
          <NPCGenerator></NPCGenerator>
        </section>
      </div>
    </main>
  );
};

export default Players;
