"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    PlusCircle,
    Trash2,
    Swords,
    Shield,
    Heart,
    User,
    Skull,
    CheckCircle,
    XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Combatant = {
    id: number;
    name: string;
    initiative: number;
    hp: number;
    maxHp: number;
    ac: number;
    isPlayer: boolean;
    savingThrows: number;
    failedSaves: number;
};

export default function InitiativeTracker() {
    const [combatants, setCombatants] = useState<Combatant[]>([]);
    const [newCombatant, setNewCombatant] = useState({
        name: "",
        initiative: "",
        hp: "",
        ac: "",
        isPlayer: false,
        savingThrows: 3,
    });
    const [currentTurn, setCurrentTurn] = useState(0);
    const [isCombatActive, setIsCombatActive] = useState(false);
    const [hpChange, setHpChange] = useState<{ [key: number]: number }>({});

    const addCombatant = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCombatant.name && newCombatant.initiative) {
            const combatant: Combatant = {
                id: Date.now(),
                name: newCombatant.name,
                initiative: Number(newCombatant.initiative),
                hp: Number(newCombatant.hp) || 0,
                maxHp: Number(newCombatant.hp) || 0,
                ac: Number(newCombatant.ac) || 0,
                isPlayer: newCombatant.isPlayer,
                savingThrows: newCombatant.savingThrows,
                failedSaves: 0,
            };
            setCombatants((prev) =>
                [...prev, combatant].sort((a, b) => b.initiative - a.initiative)
            );
            setNewCombatant({
                name: "",
                initiative: "",
                hp: "",
                ac: "",
                isPlayer: false,
                savingThrows: 3,
            });
        }
    };

    const removeCombatant = (id: number) => {
        setCombatants((prev) => prev.filter((c) => c.id !== id));
    };

    const startCombat = () => {
        if (combatants.length > 0) {
            setIsCombatActive(true);
            setCurrentTurn(0);
        }
    };

    const nextTurn = () => {
        let nextTurnIndex = (currentTurn + 1) % combatants.length;
        while (combatants[nextTurnIndex].hp <= 0) {
            nextTurnIndex = (nextTurnIndex + 1) % combatants.length;
        }
        setCurrentTurn(nextTurnIndex);
    };

    const updateHP = (id: number, change: number) => {
        setCombatants((prev) =>
            prev.map((c) => {
                if (c.id === id) {
                    const newHp = c.hp + change;
                    if (newHp <= 0 && c.hp > 0) {
                        // Combatant has hit 0HP, roll a d20 for saving throw
                        const d20Roll = Math.floor(Math.random() * 20) + 1;
                        if (d20Roll >= 10) {
                            // Success, combatant stays alive
                            return { ...c, hp: 1 };
                        } else {
                            // Fail, combatant dies
                            return { ...c, hp: 0 };
                        }
                    }
                    return { ...c, hp: newHp };
                }
                return c;
            })
        );
    };

    const handleSaveThrow = (id: number, success: boolean) => {
        setCombatants((prev) =>
            prev.map((c) => {
                if (c.id === id) {
                    if (success) {
                        return { ...c, hp: 1, failedSaves: 0 };
                    } else {
                        const newFailedSaves = c.failedSaves + 1;
                        if (newFailedSaves >= 3) {
                            return { ...c, hp: 0, failedSaves: newFailedSaves };
                        }
                        return { ...c, failedSaves: newFailedSaves };
                    }
                }
                return c;
            })
        );
    };

    const handleHpChange = (id: number, value: number) => {
        setHpChange((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Initiative Tracker</h1>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Add Combatant</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={addCombatant}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={newCombatant.name}
                                onChange={(e) =>
                                    setNewCombatant((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                placeholder="Combatant name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="initiative">Initiative</Label>
                            <Input
                                id="initiative"
                                type="number"
                                value={newCombatant.initiative}
                                onChange={(e) =>
                                    setNewCombatant((prev) => ({
                                        ...prev,
                                        initiative: e.target.value,
                                    }))
                                }
                                placeholder="Initiative roll"
                            />
                        </div>
                        <div>
                            <Label htmlFor="hp">HP</Label>
                            <Input
                                id="hp"
                                type="number"
                                value={newCombatant.hp}
                                onChange={(e) =>
                                    setNewCombatant((prev) => ({
                                        ...prev,
                                        hp: e.target.value,
                                    }))
                                }
                                placeholder="Hit Points"
                            />
                        </div>
                        <div>
                            <Label htmlFor="ac">AC</Label>
                            <Input
                                id="ac"
                                type="number"
                                value={newCombatant.ac}
                                onChange={(e) =>
                                    setNewCombatant((prev) => ({
                                        ...prev,
                                        ac: e.target.value,
                                    }))
                                }
                                placeholder="Armor Class"
                            />
                        </div>
                        <div>
                            <Label htmlFor="savingThrows">Saving Throws</Label>
                            <Input
                                id="savingThrows"
                                type="number"
                                value={newCombatant.savingThrows}
                                onChange={(e) =>
                                    setNewCombatant((prev) => ({
                                        ...prev,
                                        savingThrows: Number(e.target.value),
                                    }))
                                }
                                placeholder="Saving Throws (default 3)"
                            />
                        </div>
                        <div className="flex items-center space-x-2 pt-8">
                            <input
                                type="checkbox"
                                id="isPlayer"
                                checked={newCombatant.isPlayer}
                                onChange={(e) =>
                                    setNewCombatant((prev) => ({
                                        ...prev,
                                        isPlayer: e.target.checked,
                                    }))
                                }
                                className="h-4 w-4"
                            />
                            <Label htmlFor="isPlayer">Player Character</Label>
                        </div>
                        <div className="pt-6">
                            <Button type="submit" className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="flex gap-4 mb-6">
                <Button
                    onClick={startCombat}
                    disabled={isCombatActive || combatants.length === 0}
                >
                    <Swords className="mr-2 h-4 w-4" />
                    Start Combat
                </Button>
                <Button onClick={nextTurn} disabled={!isCombatActive}>
                    Next Turn
                </Button>
            </div>

            <div className="grid gap-4">
                {combatants.map((combatant, index) => (
                    <Card
                        key={combatant.id}
                        className={`${
                            index === currentTurn && isCombatActive
                                ? "border-primary"
                                : ""
                        } ${
                            combatant.hp <= 0 &&
                            combatant.failedSaves >= combatant.savingThrows
                                ? "border-red-500"
                                : ""
                        }`}
                    >
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold">
                                    {combatant.initiative}
                                </span>
                                <div>
                                    <h3 className="font-bold flex items-center gap-2">
                                        {combatant.isPlayer ? (
                                            <User className="h-4 w-4" />
                                        ) : (
                                            <Skull className="h-4 w-4" />
                                        )}
                                        {combatant.name}
                                        {combatant.failedSaves > 0 && (
                                            <span className="flex items-center text-red-500">
                                                <XCircle className="ml-2 h-4 w-4" />
                                                {combatant.failedSaves}
                                            </span>
                                        )}
                                    </h3>
                                    <div className="flex gap-4 text-sm text-muted-foreground">
                                        {combatant.hp > 0 && (
                                            <>
                                                <span className="flex items-center">
                                                    <Heart className="mr-1 h-4 w-4" />
                                                    {combatant.hp}/
                                                    {combatant.maxHp}
                                                </span>
                                                <span className="flex items-center">
                                                    <Shield className="mr-1 h-4 w-4" />
                                                    {combatant.ac}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {combatant.hp > 0 ? (
                                    <>
                                        <Input
                                            type="number"
                                            value={hpChange[combatant.id] || 1}
                                            onChange={(e) =>
                                                handleHpChange(
                                                    combatant.id,
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="w-16"
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                updateHP(
                                                    combatant.id,
                                                    -(
                                                        hpChange[
                                                            combatant.id
                                                        ] || 1
                                                    )
                                                )
                                            }
                                        >
                                            -
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                updateHP(
                                                    combatant.id,
                                                    hpChange[combatant.id] || 1
                                                )
                                            }
                                        >
                                            +
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleSaveThrow(
                                                    combatant.id,
                                                    true
                                                )
                                            }
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleSaveThrow(
                                                    combatant.id,
                                                    false
                                                )
                                            }
                                        >
                                            <XCircle className="h-4 w-4" />
                                        </Button>
                                    </>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        removeCombatant(combatant.id)
                                    }
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
