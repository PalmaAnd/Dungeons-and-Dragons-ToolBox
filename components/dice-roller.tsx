"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type DieType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";

const diceTypes: DieType[] = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"];

export function DiceRoller() {
    const [rolls, setRolls] = useState<{ die: DieType; result: number }[]>([]);
    const [customRoll, setCustomRoll] = useState("");

    const rollDie = (sides: number) => {
        return Math.floor(Math.random() * sides) + 1;
    };

    const handleRoll = (die: DieType) => {
        const sides = parseInt(die.substring(1));
        const result = rollDie(sides);
        setRolls((prev) => [...prev, { die, result }]);
    };

    const handleCustomRoll = () => {
        const [count, die] = customRoll.toLowerCase().split("d");
        const numDice = parseInt(count) || 1;
        const sides = parseInt(die);

        if (isNaN(sides)) return;

        const results = Array.from({ length: numDice }, () => rollDie(sides));
        const total = results.reduce((sum, result) => sum + result, 0);

        setRolls((prev) => [
            ...prev,
            { die: `${numDice}d${sides}` as DieType, result: total },
        ]);
        setCustomRoll("");
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {diceTypes.map((die) => (
                    <Button key={die} onClick={() => handleRoll(die)}>
                        Roll {die}
                    </Button>
                ))}
            </div>
            <div className="flex items-end gap-2">
                <div className="grow">
                    <Label htmlFor="custom-roll">Custom Roll</Label>
                    <Input
                        id="custom-roll"
                        value={customRoll}
                        onChange={(e) => setCustomRoll(e.target.value)}
                        placeholder="e.g., 2d6, 3d8"
                    />
                </div>
                <Button onClick={handleCustomRoll}>Roll</Button>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Roll Results</h3>
                <ul className="space-y-1">
                    {rolls.map((roll, index) => (
                        <li key={index} className="bg-secondary p-2 rounded">
                            {roll.die}: {roll.result}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
