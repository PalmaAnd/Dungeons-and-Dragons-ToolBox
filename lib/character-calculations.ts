/* eslint-disable @typescript-eslint/no-explicit-any */
// Character calculation utilities
import type { EnhancedCharacterData } from "@/components/character-creator";

export const calculateRacialBonuses = (
    race: string,
    subrace: string,
    enhancedData: EnhancedCharacterData,
    baseAbilities: Record<string, number>
): Record<string, number> => {
    const raceInfo = enhancedData.races[race];
    if (!raceInfo) return baseAbilities;

    const modifiedAbilities = { ...baseAbilities };

    // Apply main racial bonuses
    Object.entries(raceInfo.abilityScoreIncrease).forEach(
        ([ability, bonus]) => {
            if (ability === "all") {
                // Human variant - all abilities increase by the bonus amount
                Object.keys(modifiedAbilities).forEach((abilityName) => {
                    modifiedAbilities[abilityName] += bonus;
                });
            } else {
                modifiedAbilities[ability] =
                    (modifiedAbilities[ability] || 0) +
                    (typeof bonus === "number" ? bonus : 0);
            }
        }
    );

    // Apply subrace bonuses if applicable
    if (subrace && raceInfo.subraces) {
        const subraceInfo = raceInfo.subraces.find((sr) => sr.name === subrace);
        if (subraceInfo) {
            Object.entries(subraceInfo.abilityScoreIncrease).forEach(
                ([ability, bonus]) => {
                    modifiedAbilities[ability] =
                        (modifiedAbilities[ability] || 0) +
                        (typeof bonus === "number" ? bonus : 0);
                }
            );
        }
    }

    return modifiedAbilities;
};

export const calculateHitPointsForLevel = (
    level: number,
    className: string,
    conModifier: number,
    enhancedData: EnhancedCharacterData
): number => {
    const classInfo = enhancedData.classes[className];
    if (!classInfo) return 0;

    const hitDie = parseInt(classInfo.hitDie.substring(1));

    // Level 1: Max hit die + CON modifier
    let hitPoints = hitDie + conModifier;

    // Additional levels: Average of hit die + CON modifier per level
    if (level > 1) {
        const averageRoll = Math.floor(hitDie / 2) + 1;
        hitPoints += (level - 1) * (averageRoll + conModifier);
    }

    return Math.max(1, hitPoints); // Minimum 1 HP
};

export const calculateSpellSlots = (
    level: number,
    className: string
): Record<string, number> => {
    const spellSlotProgression: Record<
        string,
        Record<number, Record<string, number>>
    > = {
        Wizard: {
            1: { "1st": 2 },
            2: { "1st": 3 },
            3: { "1st": 4, "2nd": 2 },
            4: { "1st": 4, "2nd": 3 },
            5: { "1st": 4, "2nd": 3, "3rd": 2 },
            // ... more levels would be added
        },
        Sorcerer: {
            1: { "1st": 2 },
            2: { "1st": 3 },
            3: { "1st": 4, "2nd": 2 },
            4: { "1st": 4, "2nd": 3 },
            5: { "1st": 4, "2nd": 3, "3rd": 2 },
        },
        Warlock: {
            1: { "1st": 1 },
            2: { "1st": 2 },
            3: { "2nd": 2 },
            4: { "2nd": 2 },
            5: { "3rd": 2 },
        },
        // Add more classes as needed
    };

    return spellSlotProgression[className]?.[level] || {};
};

export const getClassFeaturesByLevel = (
    level: number,
    className: string,
    subclass?: string
): string[] => {
    const features: Record<string, Record<number, string[]>> = {
        Fighter: {
            1: ["Fighting Style", "Second Wind"],
            2: ["Action Surge"],
            3: ["Martial Archetype"],
            4: ["Ability Score Improvement"],
            5: ["Extra Attack"],
        },
        Wizard: {
            1: ["Spellcasting", "Arcane Recovery"],
            2: ["Arcane Tradition"],
            3: ["Cantrip Formulas"],
            4: ["Ability Score Improvement"],
            5: ["Arcane Tradition Feature"],
        },
        // Add more classes
    };

    const classFeatures = features[className]?.[level] || [];

    // Add subclass-specific features if needed
    if (subclass) {
        // This would contain subclass-specific features
    }

    return classFeatures;
};

export const calculateArmorClass = (
    dexModifier: number,
    armor: string,
    shield: boolean = false,
    enhancedData: EnhancedCharacterData
): number => {
    let baseAC = 10 + dexModifier; // Unarmored

    // Find armor in equipment data
    const armorItem = enhancedData.equipment.armor.find(
        (a) => a.name === armor
    );

    if (armorItem) {
        if (armorItem.type === "Light" && armorItem.armorClass) {
            // Light armor: base AC + full Dex modifier
            baseAC = parseInt(armorItem.armorClass.split("+")[0]) + dexModifier;
        } else if (armorItem.type === "Medium" && armorItem.armorClass) {
            // Medium armor: base AC + Dex modifier (max 2)
            baseAC =
                parseInt(armorItem.armorClass.split("+")[0]) +
                Math.min(dexModifier, 2);
        } else if (armorItem.type === "Heavy" && armorItem.armorClass) {
            // Heavy armor: base AC only, no Dex modifier
            baseAC = parseInt(armorItem.armorClass);
        }
    }

    // Add shield bonus (+2 AC)
    if (shield) {
        baseAC += 2;
    }

    return baseAC;
};

export const getAvailableSpells = (
    level: number,
    className: string,
    race: string,
    subrace: string,
    enhancedData: any
): Record<string, any[]> => {
    const spellData = enhancedData.spells;
    const availableSpells: Record<string, any[]> = {
        cantrips: [],
        level1: [],
        level2: [],
        level3: [],
    };

    // Get class-specific spells
    if (spellData.classSpells[className]) {
        // Add cantrips available to this class
        availableSpells.cantrips = spellData.cantrips.filter((spell: any) =>
            spell.classes.includes(className)
        );

        // Add level 1 spells
        availableSpells.level1 = spellData.level1.filter((spell: any) =>
            spell.classes.includes(className)
        );

        // Add level 2 spells (if level 3+)
        if (level >= 3) {
            availableSpells.level2 = spellData.level2.filter((spell: any) =>
                spell.classes.includes(className)
            );
        }

        // Add level 3 spells (if level 5+)
        if (level >= 5) {
            availableSpells.level3 = spellData.level3.filter((spell: any) =>
                spell.classes.includes(className)
            );
        }
    }

    return availableSpells;
};

export const getDefaultSpells = (
    level: number,
    className: string,
    race: string,
    subrace: string,
    enhancedData: any
): Record<string, string[]> => {
    const spellData = enhancedData.spells;
    const defaultSpells: Record<string, string[]> = {
        cantrips: [],
        level1: [],
        level2: [],
        level3: [],
    };

    // Add racial spells
    const raceKey = subrace || race;
    if (spellData.racialSpells[raceKey]) {
        const racialSpells = spellData.racialSpells[raceKey];

        if (racialSpells.cantrips) {
            if (Array.isArray(racialSpells.cantrips)) {
                defaultSpells.cantrips.push(...racialSpells.cantrips);
            }
        }

        if (racialSpells.level1 && level >= 1) {
            defaultSpells.level1.push(...racialSpells.level1);
        }

        if (racialSpells.level2 && level >= 3) {
            defaultSpells.level2.push(...racialSpells.level2);
        }
    }

    // Add class-specific default spells based on level
    if (spellData.classSpells[className]) {
        if (className === "Wizard" && level >= 1) {
            // Wizards typically start with basic utility spells
            if (defaultSpells.cantrips.length === 0) {
                defaultSpells.cantrips.push(
                    "Mage Hand",
                    "Prestidigitation",
                    "Fire Bolt"
                );
            }
            if (defaultSpells.level1.length === 0) {
                defaultSpells.level1.push(
                    "Magic Missile",
                    "Shield",
                    "Detect Magic",
                    "Burning Hands"
                );
            }
        } else if (className === "Cleric" && level >= 1) {
            if (defaultSpells.cantrips.length === 0) {
                defaultSpells.cantrips.push(
                    "Sacred Flame",
                    "Guidance",
                    "Light"
                );
            }
            // Clerics prepare spells, so we don't add level 1 spells by default
        } else if (className === "Sorcerer" && level >= 1) {
            if (defaultSpells.cantrips.length === 0) {
                defaultSpells.cantrips.push(
                    "Fire Bolt",
                    "Mage Hand",
                    "Prestidigitation",
                    "Ray of Frost"
                );
            }
            if (defaultSpells.level1.length === 0) {
                defaultSpells.level1.push("Magic Missile", "Shield");
            }
        } else if (className === "Warlock" && level >= 1) {
            if (defaultSpells.cantrips.length === 0) {
                defaultSpells.cantrips.push("Eldritch Blast", "Minor Illusion");
            }
            if (defaultSpells.level1.length === 0) {
                defaultSpells.level1.push("Cure Wounds", "Healing Word");
            }
        } else if (className === "Bard" && level >= 1) {
            if (defaultSpells.cantrips.length === 0) {
                defaultSpells.cantrips.push(
                    "Vicious Mockery",
                    "Minor Illusion"
                );
            }
            if (defaultSpells.level1.length === 0) {
                defaultSpells.level1.push(
                    "Healing Word",
                    "Thunderwave",
                    "Cure Wounds",
                    "Detect Magic"
                );
            }
        } else if (className === "Druid" && level >= 1) {
            if (defaultSpells.cantrips.length === 0) {
                defaultSpells.cantrips.push("Druidcraft", "Guidance");
            }
            // Druids prepare spells, so we don't add level 1 spells by default
        }
    }

    return defaultSpells;
};

export const validateCharacterData = (character: any): string[] => {
    const errors: string[] = [];

    if (!character.name?.trim()) {
        errors.push("Character name is required");
    }

    if (!character.class) {
        errors.push("Character class is required");
    }

    if (!character.race) {
        errors.push("Character race is required");
    }

    if (character.level < 1 || character.level > 20) {
        errors.push("Character level must be between 1 and 20");
    }

    // Validate ability scores
    Object.entries(character.abilities).forEach(([ability, score]) => {
        if (typeof score !== "number" || score < 3 || score > 20) {
            errors.push(`${ability} score must be between 3 and 20`);
        }
    });

    return errors;
};
