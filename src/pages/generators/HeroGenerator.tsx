import React, { useState } from "react";

interface Hero {
  name: string;
  race: string;
  heroClass: string;
  mood: string;
  background: string;
  lifestyle: string;
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
  const lifestyles: string[] = [
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
    const randomRace =
      races[Math.floor(Math.random() * races.length)]?.toString();
    const randomClass =
      classes[Math.floor(Math.random() * classes.length)]?.toString();
    const randomMood =
      moods[Math.floor(Math.random() * moods.length)]?.toString();
    const randomBackground =
      backgrounds[Math.floor(Math.random() * backgrounds.length)]?.toString();
    const randomLifestyle =
      lifestyles[Math.floor(Math.random() * lifestyles.length)]?.toString();
    const randomStats = generateRandomStats();

    const race: string = randomRace == undefined ? "" : randomRace;
    const heroClass: string = randomClass == undefined ? "" : randomClass;
    const mood: string = randomMood == undefined ? "" : randomMood;
    const background: string =
      randomBackground == undefined ? "" : randomBackground;
    const name: string = generateRandomName();
    const lifestyle: string =
      randomLifestyle == undefined ? "" : randomLifestyle;

    const hero: Hero = {
      name: name,
      race: race,
      heroClass: heroClass,
      mood: mood,
      background: background,
      lifestyle: lifestyle,
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
            <strong>Class:</strong> {generatedHero.heroClass}
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
