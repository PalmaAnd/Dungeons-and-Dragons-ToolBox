"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// This is a mock monster list. In a real application, this would come from an API or database.
const monsters = [
    {
        name: "Goblin",
        type: "Humanoid",
        cr: "1/4",
        size: "Small",
        alignment: "Neutral Evil",
    },
    {
        name: "Dragon, Red",
        type: "Dragon",
        cr: "17",
        size: "Huge",
        alignment: "Chaotic Evil",
    },
    {
        name: "Zombie",
        type: "Undead",
        cr: "1/4",
        size: "Medium",
        alignment: "Neutral Evil",
    },
    {
        name: "Beholder",
        type: "Aberration",
        cr: "13",
        size: "Large",
        alignment: "Lawful Evil",
    },
    {
        name: "Unicorn",
        type: "Celestial",
        cr: "5",
        size: "Large",
        alignment: "Lawful Good",
    },
];

export default function MonsterCompendium() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");

    const filteredMonsters = monsters.filter(
        (monster) =>
            monster.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterType === "all" || monster.type === filterType)
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Monster Compendium</h1>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                    placeholder="Search monsters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="max-w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {Array.from(new Set(monsters.map((m) => m.type))).map(
                            (type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            )
                        )}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMonsters.map((monster, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{monster.name}</CardTitle>
                            <CardDescription>{monster.type}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>
                                <strong>CR:</strong> {monster.cr}
                            </p>
                            <p>
                                <strong>Size:</strong> {monster.size}
                            </p>
                            <p>
                                <strong>Alignment:</strong> {monster.alignment}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline">View Details</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
