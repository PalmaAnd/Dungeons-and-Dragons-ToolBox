"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MonsterCard } from "@/components/monster-card";
import { MonsterDetails } from "@/components/monster-details";
import { Search } from "lucide-react";

interface Monster {
    cr: string;
    type: string;
    name: string;
    meta: string;
    "Armor Class": string;
    "Hit Points": string;
    Speed: string;
    STR: string;
    STR_mod: string;
    DEX: string;
    DEX_mod: string;
    CON: string;
    CON_mod: string;
    INT: string;
    INT_mod: string;
    WIS: string;
    WIS_mod: string;
    CHA: string;
    CHA_mod: string;
    "Saving Throws"?: string;
    Skills?: string;
    "Damage Immunities"?: string;
    "Condition Immunities"?: string;
    Senses: string;
    Languages: string;
    Challenge: string;
    Traits: string;
    Actions: string;
    "Legendary Actions"?: string;
    img_url: string;
    size: string;
    alignment: string;
}

interface MonsterCompendiumProps {
    monsters: Monster[];
}

export function MonsterCompendium({ monsters }: MonsterCompendiumProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [crFilter, setCrFilter] = useState("all");
    const [selectedMonster, setSelectedMonster] = useState<Monster | null>(
        null
    );

    // Get unique monster types for filter
    const monsterTypes = useMemo(() => {
        const types = new Set(
            monsters
                .map((monster) => monster.type)
                .filter((type): type is string => type !== undefined)
        );
        return Array.from(types).sort();
    }, [monsters]);

    // Get unique challenge ratings for filter
    const challengeRatings = useMemo(() => {
        const ratings = new Set(monsters.map((monster) => monster.cr));
        return Array.from(ratings).sort((a, b) => {
            // Sort numerically, handling fractions
            const aNum =
                a && a.includes("/") ? eval(a) : Number.parseFloat(a || "0");
            const bNum = b?.includes("/")
                ? eval(b)
                : Number.parseFloat(b ?? "0");
            return aNum - bNum;
        });
    }, [monsters]);

    // Filter monsters based on search term and filters
    const filteredMonsters = useMemo(() => {
        return monsters.filter((monster) => {
            const matchesSearch = monster.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesType =
                typeFilter === "all" || monster.type === typeFilter;
            const matchesCR = crFilter === "all" || monster.cr === crFilter;

            return matchesSearch && matchesType && matchesCR;
        });
    }, [monsters, searchTerm, typeFilter, crFilter]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <Label htmlFor="search" className="sr-only">
                        Search Monsters
                    </Label>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="search"
                            placeholder="Search monsters..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div>
                        <Label htmlFor="type-filter" className="sr-only">
                            Filter by type
                        </Label>
                        <Select
                            value={typeFilter}
                            onValueChange={setTypeFilter}
                        >
                            <SelectTrigger
                                id="type-filter"
                                className="w-[180px]"
                            >
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                {monsterTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="cr-filter" className="sr-only">
                            Filter by CR
                        </Label>
                        <Select value={crFilter} onValueChange={setCrFilter}>
                            <SelectTrigger id="cr-filter" className="w-[180px]">
                                <SelectValue placeholder="Filter by CR" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All CRs</SelectItem>
                                {challengeRatings.map((cr) => (
                                    <SelectItem
                                        key={cr}
                                        value={cr ?? "unknown"}
                                    >
                                        CR {cr}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {selectedMonster ? (
                <div className="space-y-4">
                    <Button
                        variant="outline"
                        onClick={() => setSelectedMonster(null)}
                        className="mb-4"
                    >
                        Back to List
                    </Button>
                    <MonsterDetails monster={selectedMonster} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMonsters.length > 0 ? (
                        filteredMonsters.map((monster) => (
                            <MonsterCard
                                key={monster.name}
                                monster={monster}
                                onClick={() => setSelectedMonster(monster)}
                            />
                        ))
                    ) : (
                        <Card className="col-span-full">
                            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium">
                                    No monsters found
                                </h3>
                                <p className="text-muted-foreground">
                                    Try adjusting your search or filters to find
                                    what you re looking for.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
}
