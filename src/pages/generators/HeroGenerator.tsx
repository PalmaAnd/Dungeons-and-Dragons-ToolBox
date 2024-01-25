import React, { useState } from "react";

interface Hero {
  name: any;
  race: any;
  class: any;
  mood: any;
  background: any;
  lifestyle: any;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

const HeroGenerator: React.FC = () => {
  const races: string[] = ["Human", "Elf", "Dwarf", "Halfling", "Orc"];
  const classes: string[] = ["Warrior", "Wizard", "Rogue", "Cleric", "Bard"];
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
    const randomPrefix: any =
      namePrefixes[Math.floor(Math.random() * namePrefixes.length)];
    const randomSuffix: any =
      nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)];
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${randomPrefix}${randomSuffix}`;
  };

  const generateRandomStats = () => {
    return {
      strength: Math.floor(Math.random() * 18) + 1,
      dexterity: Math.floor(Math.random() * 18) + 1,
      constitution: Math.floor(Math.random() * 18) + 1,
      intelligence: Math.floor(Math.random() * 18) + 1,
      wisdom: Math.floor(Math.random() * 18) + 1,
      charisma: Math.floor(Math.random() * 18) + 1,
    };
  };

  const [generatedHero, setGeneratedHero] = useState<Hero | null>(null);

  const generateHero = () => {
    const randomRace: any = races[Math.floor(Math.random() * races.length)];
    const randomClass: any =
      classes[Math.floor(Math.random() * classes.length)];
    const randomMood: any = moods[Math.floor(Math.random() * moods.length)];
    const randomBackground: any =
      backgrounds[Math.floor(Math.random() * backgrounds.length)];
    const randomName: string = generateRandomName();
    const randomLifestyle: any =
      lifestyle[Math.floor(Math.random() * lifestyle.length)];
    const randomStats = generateRandomStats();

    const hero: Hero = {
      name: randomName,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      race: randomRace,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      class: randomClass,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      mood: randomMood,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      background: randomBackground,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      lifestyle: randomLifestyle,
      ...randomStats,
    };

    setGeneratedHero(hero);
  };

  return (
    <div className="text-center">
      <button
        className="mb-2 cursor-pointer rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
        onClick={generateHero}
      >
        Generate Hero
      </button>
      {generatedHero && (
        <div className="mt-5 flex flex-col items-center p-5 text-center text-white">
          <h2>
            <strong>Name:</strong> {generatedHero.name}
          </h2>
          <div>
            <strong>Race:</strong> {generatedHero.race}
          </div>
          <div>
            <strong>Class:</strong> {generatedHero.class}
          </div>
          <div>
            <strong>Mood:</strong> {generatedHero.mood}
          </div>
          <div>
            <strong>Background:</strong> {generatedHero.background}
          </div>
          <div>
            <strong>Lifestyle:</strong> {generatedHero.lifestyle}
          </div>
          <div>
            <strong>Stats:</strong>
            <ul>
              <li>Strength: {generatedHero.strength}</li>
              <li>Dexterity: {generatedHero.dexterity}</li>
              <li>Constitution: {generatedHero.constitution}</li>
              <li>Intelligence: {generatedHero.intelligence}</li>
              <li>Wisdom: {generatedHero.wisdom}</li>
              <li>Charisma: {generatedHero.charisma}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroGenerator;
