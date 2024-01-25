import React, { useState } from "react";

interface NPC {
  name: any;
  race: any;
  job: any;
  mood: any;
  background: any;
  lifestyle: any;
}

const NPCGenerator: React.FC = () => {
  const races: string[] = ["Human", "Elf", "Dwarf", "Halfling", "Orc"];
  const jobs: string[] = [
    "Blacksmith",
    "Alchemist",
    "Bard",
    "Cleric",
    "Druid",
    "Merchant",
    "Minstrel",
    "Noble",
    "Painter",
    "Ranger",
    "Sailor",
    "Scholar",
    "Thief",
    "Warrior",
    "Wizard",
    "Chef",
    "Innkeeper",
    "Farmer",
    "Scribe",
    "Tailor",
  ];
  const moods: string[] = [
    "Friendly",
    "Grumpy",
    "Mysterious",
    "Optimistic",
    "Pensive",
    "Excitable",
    "Melancholic",
    "Jovial",
    "Sarcastic",
    "Courageous",
    "Wise",
    "Mischievous",
    "Determined",
    "Nervous",
    "Hopeful",
    "Regretful",
    "Aloof",
    "Stubborn",
    "Reclusive",
    "Adventurous",
  ];
  const backgrounds: string[] = ["Commoner", "Criminal", "Sage", "Acolyte"];
  const lifestyle: string[] = [
    "Squalid $",
    "Poor $$",
    "Modest $$$",
    "Comfortable $$$$",
    "Wealthy $$$$$",
    "Aristocratic $$$$$$",
  ];

  const namePrefixes: string[] = ["A", "Be", "Ca", "Do", "E"];
  const nameSuffixes: string[] = [
    "thor",
    "dor",
    "ion",
    "ara",
    "wyn",
    "fir",
    "ian",
    "li",
    "tra",
    "zara",
  ];

  const generateRandomName = () => {
    const randomPrefix: string | undefined =
      namePrefixes[Math.floor(Math.random() * namePrefixes.length)];
    const randomSuffix: string | undefined =
      nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)];
    return `${randomPrefix!}${randomSuffix!}`;
  };

  const [generatedNPC, setGeneratedNPC] = useState<NPC | null>(null);

  const generateNPC = () => {
    const randomRace = races[Math.floor(Math.random() * races.length)];
    const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    const randomBackground =
      backgrounds[Math.floor(Math.random() * backgrounds.length)];
    const randomName: string = generateRandomName();
    const randomLifestyle =
      lifestyle[Math.floor(Math.random() * lifestyle.length)];

    const npc: NPC = {
      name: randomName,
      race: randomRace,
      job: randomJob,
      mood: randomMood,
      background: randomBackground,
      lifestyle: randomLifestyle,
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
            <strong>Job:</strong> {generatedNPC.job}
          </div>
          <div>
            <strong>Mood:</strong> {generatedNPC.mood}
          </div>
          <div>
            <strong>Background:</strong> {generatedNPC.background}
          </div>
          <div>
            <strong>Lifestyle:</strong> {generatedNPC.lifestyle}
          </div>
        </div>
      )}
    </div>
  );
};

export default NPCGenerator;
