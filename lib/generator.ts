const tavernPrefixes = [
    "The Prancing",
    "The Green",
    "The Leaky",
    "The Rusty",
    "The Drunken",
    "The Salty",
    "The Winking",
    "The Eolian",
    "The Bannered",
    "The Sleeping",
];

const tavernSuffixes = [
    "Pony",
    "Dragon",
    "Cauldron",
    "Nail",
    "Clam",
    "Sailor",
    "Skeever",
    "Eolian",
    "Mare",
    "Giant",
];

const npcFirstNames = [
    "John",
    "Elena",
    "Gorim",
    "Lila",
    "Thorin",
    "Mira",
    "Borin",
    "Fiona",
    "Gareth",
    "Hilda",
];

const npcLastNames = [
    "the Brave",
    "the Wise",
    "the Strong",
    "the Swift",
    "the Stout",
    "the Mysterious",
    "the Bold",
    "the Fair",
    "the Gallant",
    "the Hardy",
];

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function generateTavernName(): string {
    const prefix = getRandomItem(tavernPrefixes);
    const suffix = getRandomItem(tavernSuffixes);
    return `${prefix} ${suffix}`;
}

export function generateNpcName(): string {
    const firstName = getRandomItem(npcFirstNames);
    const lastName = getRandomItem(npcLastNames);
    return `${firstName} ${lastName}`;
}
