import React, { useState } from "react";

interface NPC {
  name: string;
  race: string;
  class: string;
  mood: string;
  background: string;
  // Add more attributes as needed
}

const NPCGenerator: React.FC = () => {
  const races: string[] = ["Human", "Elf", "Dwarf", "Halfling", "Orc"];
  const classes: string[] = ["Fighter", "Wizard", "Rogue", "Cleric", "Bard"];
  const moods: string[] = [
    "Friendly",
    "Grumpy",
    "Mysterious",
    "Optimistic",
    "Pensive",
  ];
  const backgrounds: string[] = [
    "Noble",
    "Commoner",
    "Criminal",
    "Sage",
    "Acolyte",
  ];

  const generateRandomName = () => {
    const prefixes: string[] = ["A", "Be", "Ca", "Do", "E"];
    const suffixes: string[] = ["thor", "dor", "ion", "ara", "wyn"];
    const randomPrefix: string =
      prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix: string =
      suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${randomPrefix}${randomSuffix}`;
  };

  const [generatedNPC, setGeneratedNPC] = useState<NPC | null>(null);

  const generateNPC = () => {
    const randomRace: string = races[Math.floor(Math.random() * races.length)];
    const randomClass: string =
      classes[Math.floor(Math.random() * classes.length)];
    const randomMood: string = moods[Math.floor(Math.random() * moods.length)];
    const randomBackground: string =
      backgrounds[Math.floor(Math.random() * backgrounds.length)];
    const randomName: string = generateRandomName();

    const npc: NPC = {
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
        <div className="mt-5 flex flex-col items-center p-5 text-center text-white">
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
