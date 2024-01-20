import React, { useState } from "react";

const NPCGenerator: React.FC = () => {
  const races = ["Human", "Elf", "Dwarf", "Halfling", "Orc"];
  const classes = ["Fighter", "Wizard", "Rogue", "Cleric", "Bard"];
  const moods = ["Friendly", "Grumpy", "Mysterious", "Optimistic", "Pensive"];
  const backgrounds = ["Noble", "Commoner", "Criminal", "Sage", "Acolyte"];

  const generateRandomName = () => {
    const prefixes = ["A", "Be", "Ca", "Do", "E"];
    const suffixes = ["thor", "dor", "ion", "ara", "wyn"];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${randomPrefix}${randomSuffix}`;
  };
  const [generatedNPC, setGeneratedNPC] = useState<any>(null);

  const generateNPC = () => {
    const randomRace = races[Math.floor(Math.random() * races.length)];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    const randomBackground =
      backgrounds[Math.floor(Math.random() * backgrounds.length)];
    const randomName = generateRandomName();

    const npc = {
      name: randomName,
      race: randomRace,
      class: randomClass,
      mood: randomMood,
      background: randomBackground,
      // Add more attributes as needed
    };

    setGeneratedNPC(npc);
  };

  return (
    <div className="text-center">
      <button
        className="mb-2 cursor-pointer rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
        onClick={generateNPC}
      >
        Generate NPC
      </button>
      {generatedNPC && (
        <div className="mt-5 flex flex-col items-center  p-5 text-center text-white">
          <h2>
            <strong>Name:</strong> {generatedNPC.name}
          </h2>
          <div>
            <strong>Race:</strong> {generatedNPC.race}
          </div>
          <div>
            <strong>Class:</strong> {generatedNPC.class}
          </div>
          <div>
            <strong>Mood:</strong> {generatedNPC.mood}
          </div>
          <div>
            <strong>Background:</strong> {generatedNPC.background}
          </div>
        </div>
      )}
    </div>
  );
};

export default NPCGenerator;
