"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const classes = [
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard",
];
const races = [
    "Human",
    "Elf",
    "Dwarf",
    "Halfling",
    "Gnome",
    "Half-Elf",
    "Half-Orc",
    "Tiefling",
];
const alignments = [
    "Lawful Good",
    "Neutral Good",
    "Chaotic Good",
    "Lawful Neutral",
    "True Neutral",
    "Chaotic Neutral",
    "Lawful Evil",
    "Neutral Evil",
    "Chaotic Evil",
];

type Ability =
    | "strength"
    | "dexterity"
    | "constitution"
    | "intelligence"
    | "wisdom"
    | "charisma";
const abilities: Ability[] = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
];

export function CharacterCreator() {
    const [character, setCharacter] = useState({
        name: "",
        class: "",
        race: "",
        alignment: "",
        abilities: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCharacter({ ...character, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: string, value: string) => {
        setCharacter({ ...character, [name]: value });
    };

    const handleAbilityChange = (ability: Ability, value: string) => {
        const numValue = parseInt(value) || 0;
        setCharacter({
            ...character,
            abilities: {
                ...character.abilities,
                [ability]: Math.max(0, Math.min(20, numValue)),
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Character created:", character);
        // Here you would typically save the character or perform further actions
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Character Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={character.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="class">Class</Label>
                <Select
                    name="class"
                    value={character.class}
                    onValueChange={(value) =>
                        handleSelectChange("class", value)
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                        {classes.map((c) => (
                            <SelectItem key={c} value={c}>
                                {c}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="race">Race</Label>
                <Select
                    name="race"
                    value={character.race}
                    onValueChange={(value) => handleSelectChange("race", value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a race" />
                    </SelectTrigger>
                    <SelectContent>
                        {races.map((r) => (
                            <SelectItem key={r} value={r}>
                                {r}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="alignment">Alignment</Label>
                <Select
                    name="alignment"
                    value={character.alignment}
                    onValueChange={(value) =>
                        handleSelectChange("alignment", value)
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select an alignment" />
                    </SelectTrigger>
                    <SelectContent>
                        {alignments.map((a) => (
                            <SelectItem key={a} value={a}>
                                {a}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Abilities</h3>
                <div className="grid grid-cols-2 gap-4">
                    {abilities.map((ability) => (
                        <div key={ability}>
                            <Label htmlFor={ability}>
                                {ability.charAt(0).toUpperCase() +
                                    ability.slice(1)}
                            </Label>
                            <Input
                                id={ability}
                                name={ability}
                                type="number"
                                min="0"
                                max="20"
                                value={character.abilities[ability]}
                                onChange={(e) =>
                                    handleAbilityChange(ability, e.target.value)
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Button type="submit">Create Character</Button>
        </form>
    );
}
