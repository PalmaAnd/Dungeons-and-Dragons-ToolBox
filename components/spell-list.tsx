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
import { Button } from "@/components/ui/button";
import { SpellDetails } from "@/components/spell-details";

export type Spell = {
    id: string;
    name: string;
    level: number;
    school: string;
    casting_time: string;
    range: string;
    components: string;
    material_components: string | null;
    duration: string;
    description: string;
    damage_or_effect: string | null;
    higher_levels: string | null;
    classes: string;
};

export function SpellList({ initialSpells }: { initialSpells: Spell[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLevel, setFilterLevel] = useState("all");
    const [spells] = useState(initialSpells);
    const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);

    const filteredSpells = spells.filter(
        (spell) =>
            spell.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterLevel === "all" || spell.level.toString() === filterLevel)
    );

    return (
        <div>
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
                        <TableHead>Duration</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredSpells.map((spell) => (
                        <TableRow key={spell.id}>
                            <TableCell className="font-medium">
                                {spell.name}
                            </TableCell>
                            <TableCell>{spell.level}</TableCell>
                            <TableCell>{spell.school}</TableCell>
                            <TableCell>{spell.casting_time}</TableCell>
                            <TableCell>{spell.range}</TableCell>
                            <TableCell>{spell.components}</TableCell>
                            <TableCell>{spell.duration}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedSpell(spell)}
                                >
                                    Details
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {selectedSpell && (
                <SpellDetails
                    spell={selectedSpell}
                    onClose={() => setSelectedSpell(null)}
                />
            )}
        </div>
    );
}
