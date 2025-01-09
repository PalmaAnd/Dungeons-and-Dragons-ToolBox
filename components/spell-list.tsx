"use client";

import { useState, useMemo } from "react";
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
import { ChevronUp, ChevronDown } from "lucide-react";

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

type SortConfig = {
    key: keyof Spell;
    direction: "asc" | "desc";
};

export function SpellList({
    initialSpells,
    classes,
}: {
    initialSpells: Spell[];
    classes: string[];
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLevel, setFilterLevel] = useState("all");
    const [filterClass, setFilterClass] = useState("all");
    const [spells] = useState(initialSpells);
    const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: "name",
        direction: "asc",
    });

    const sortedAndFilteredSpells = useMemo(() => {
        const result = spells.filter(
            (spell) =>
                spell.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (filterLevel === "all" ||
                    spell.level.toString() === filterLevel) &&
                (filterClass === "all" ||
                    spell.classes
                        .toLowerCase()
                        .includes(filterClass.toLowerCase()))
        );

        if (sortConfig) {
            result.sort((a, b) => {
                // @ts-expect-error: Object is possibly 'null'.
                if (a[sortConfig.key] < b[sortConfig!.key]) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                // @ts-expect-error: Object is possibly 'null'.
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

        return result;
    }, [spells, searchTerm, filterLevel, filterClass, sortConfig]);

    const requestSort = (key: keyof Spell) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const SortableHeader = ({ column }: { column: keyof Spell }) => (
        <TableHead
            className="cursor-pointer"
            onClick={() => requestSort(column)}
        >
            <div className="flex items-center">
                {column.charAt(0).toUpperCase() +
                    column.slice(1).replace("_", " ")}
                {sortConfig.key === column &&
                    (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
            </div>
        </TableHead>
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
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
                            <SelectItem key={level} value={level.toString()}>
                                {level}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={filterClass} onValueChange={setFilterClass}>
                    <SelectTrigger className="max-w-[180px]">
                        <SelectValue placeholder="Filter by class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        {classes.map((className) => (
                            <SelectItem key={className} value={className}>
                                {className}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <SortableHeader column="name" />
                        <SortableHeader column="level" />
                        <SortableHeader column="school" />
                        <SortableHeader column="casting_time" />
                        <SortableHeader column="range" />
                        <SortableHeader column="components" />
                        <SortableHeader column="duration" />
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedAndFilteredSpells.map((spell) => (
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
