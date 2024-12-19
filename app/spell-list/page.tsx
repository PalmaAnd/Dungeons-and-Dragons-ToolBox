"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// This is a mock spell list. In a real application, this would come from an API or database.
const spells = [
    {
        name: "Fireball",
        level: 3,
        school: "Evocation",
        castingTime: "1 action",
        range: "150 feet",
        components: "V, S, M",
    },
    {
        name: "Cure Wounds",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "Touch",
        components: "V, S",
    },
    {
        name: "Mage Armor",
        level: 1,
        school: "Abjuration",
        castingTime: "1 action",
        range: "Touch",
        components: "V, S, M",
    },
    {
        name: "Detect Magic",
        level: 1,
        school: "Divination",
        castingTime: "1 action",
        range: "Self",
        components: "V, S",
    },
    {
        name: "Thunderwave",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "Self (15-foot cube)",
        components: "V, S",
    },
];

export default function SpellList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLevel, setFilterLevel] = useState("all");

    const filteredSpells = spells.filter(
        (spell) =>
            spell.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterLevel === "all" || spell.level.toString() === filterLevel)
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Spell List</h1>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                    placeholder="Search spells..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                    <SelectTrigger className="max-w-[180px]">
                        <SelectValue placeholder="Filter by level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
                            <SelectItem key={level} value={level.toString()}>
                                {level}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>School</TableHead>
                        <TableHead>Casting Time</TableHead>
                        <TableHead>Range</TableHead>
                        <TableHead>Components</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredSpells.map((spell, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {spell.name}
                            </TableCell>
                            <TableCell>{spell.level}</TableCell>
                            <TableCell>{spell.school}</TableCell>
                            <TableCell>{spell.castingTime}</TableCell>
                            <TableCell>{spell.range}</TableCell>
                            <TableCell>{spell.components}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
