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

import spells from "@/data/spells.json";
import React from "react";

export default function SpellList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLevel, setFilterLevel] = useState("all");
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const filteredSpells = spells.filter(
        (spell) =>
            spell.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterLevel === "all" || spell.level.toString() === filterLevel)
    );

    const toggleExpandRow = (index: number) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

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
                        <React.Fragment key={index}>
                            <TableRow
                                onClick={() => toggleExpandRow(index)}
                                className="cursor-pointer"
                            >
                                <TableCell className="font-medium">
                                    {spell.name}
                                </TableCell>
                                <TableCell>{spell.level}</TableCell>
                                <TableCell>{spell.school}</TableCell>
                                <TableCell>{spell.castingTime}</TableCell>
                                <TableCell>{spell.range}</TableCell>
                                <TableCell>{spell.components}</TableCell>
                            </TableRow>
                            {expandedRow === index && (
                                <TableRow>
                                    <TableCell colSpan={6} className="p-4">
                                        <div>
                                            <strong>Description:</strong>{" "}
                                            {spell.description}
                                        </div>
                                        <div>
                                            <strong>Duration:</strong>{" "}
                                            {spell.duration}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
