"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Book, Shield, Sword, Gem, Hammer } from "lucide-react";

interface Material {
    name: string;
    properties: string;
    source: string;
}

interface Source {
    abbreviation: string;
    name: string;
}

interface SpecialMaterialsData {
    armor: Material[];
    misc: Material[];
    weaponry: Material[];
    gems: Material[];
    templates: Material[];
    sources: Source[];
}

export function SpecialMaterialsCompendium({
    data,
}: {
    data: SpecialMaterialsData;
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sourceFilter, setSourceFilter] = useState<string>("all");
    const [activeTab, setActiveTab] = useState("all");

    // Get unique sources for the filter dropdown
    const sources = useMemo(() => {
        return data.sources.map((source) => ({
            value: source.abbreviation,
            label: `${source.abbreviation} (${source.name})`,
        }));
    }, [data.sources]);

    // Filter materials based on search term, source filter, and active tab
    const filteredMaterials = useMemo(() => {
        let materials: Material[] = [];

        // Add materials based on active tab
        if (activeTab === "all" || activeTab === "armor") {
            materials = [...materials, ...data.armor];
        }
        if (activeTab === "all" || activeTab === "weaponry") {
            materials = [...materials, ...data.weaponry];
        }
        if (activeTab === "all" || activeTab === "misc") {
            materials = [...materials, ...data.misc];
        }
        if (activeTab === "all" || activeTab === "gems") {
            materials = [...materials, ...data.gems];
        }
        if (activeTab === "all" || activeTab === "templates") {
            materials = [...materials, ...data.templates];
        }

        // Filter by search term
        if (searchTerm) {
            materials = materials.filter(
                (material) =>
                    material.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    material.properties
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        // Filter by source
        if (sourceFilter !== "all") {
            materials = materials.filter((material) =>
                material.source.includes(sourceFilter)
            );
        }

        return materials;
    }, [data, searchTerm, sourceFilter, activeTab]);

    // Get material type for displaying badges
    const getMaterialType = (material: Material): string => {
        if (data.armor.some((m) => m.name === material.name)) return "armor";
        if (data.weaponry.some((m) => m.name === material.name))
            return "weaponry";
        if (data.misc.some((m) => m.name === material.name)) return "misc";
        if (data.gems.some((m) => m.name === material.name)) return "gems";
        if (data.templates.some((m) => m.name === material.name))
            return "templates";
        return "unknown";
    };

    // Get badge color based on material type
    const getBadgeColor = (type: string): string => {
        switch (type) {
            case "armor":
                return "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
            case "weaponry":
                return "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300";
            case "misc":
                return "bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
            case "gems":
                return "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "templates":
                return "bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
            default:
                return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    // Get icon based on material type
    const getTypeIcon = (type: string) => {
        switch (type) {
            case "armor":
                return <Shield className="h-4 w-4" />;
            case "weaponry":
                return <Sword className="h-4 w-4" />;
            case "gems":
                return <Gem className="h-4 w-4" />;
            case "templates":
                return <Hammer className="h-4 w-4" />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <Label htmlFor="search" className="sr-only">
                        Search
                    </Label>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="search"
                            placeholder="Search materials..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="source-filter" className="sr-only">
                        Filter by source
                    </Label>
                    <Select
                        value={sourceFilter}
                        onValueChange={setSourceFilter}
                    >
                        <SelectTrigger id="source-filter" className="w-[180px]">
                            <SelectValue placeholder="Filter by source" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Sources</SelectItem>
                            {sources.map((source) => (
                                <SelectItem
                                    key={source.value}
                                    value={source.value}
                                >
                                    {source.value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
            >
                <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger
                        value="armor"
                        className="flex items-center gap-1"
                    >
                        <Shield className="h-4 w-4" />
                        <span className="hidden md:inline">Armor</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="weaponry"
                        className="flex items-center gap-1"
                    >
                        <Sword className="h-4 w-4" />
                        <span className="hidden md:inline">Weaponry</span>
                    </TabsTrigger>
                    <TabsTrigger value="misc">Misc</TabsTrigger>
                    <TabsTrigger
                        value="gems"
                        className="flex items-center gap-1"
                    >
                        <Gem className="h-4 w-4" />
                        <span className="hidden md:inline">Gems</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="templates"
                        className="flex items-center gap-1"
                    >
                        <Hammer className="h-4 w-4" />
                        <span className="hidden md:inline">Templates</span>
                    </TabsTrigger>
                </TabsList>

                <div className="rounded-md border">
                    <div className="p-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            {filteredMaterials.length}{" "}
                            {filteredMaterials.length === 1
                                ? "Material"
                                : "Materials"}{" "}
                            Found
                        </h2>
                        <div className="flex items-center gap-2">
                            <Book className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                                {sourceFilter === "all"
                                    ? "All Sources"
                                    : sourceFilter}
                            </span>
                        </div>
                    </div>
                    <Separator />
                    <ScrollArea className="h-[60vh]">
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredMaterials.length > 0 ? (
                                filteredMaterials.map((material, index) => {
                                    const materialType =
                                        getMaterialType(material);
                                    return (
                                        <Card
                                            key={`${material.name}-${index}`}
                                            className="h-full"
                                        >
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start">
                                                    <CardTitle className="text-lg">
                                                        {material.name}
                                                    </CardTitle>
                                                    <Badge
                                                        className={getBadgeColor(
                                                            materialType
                                                        )}
                                                    >
                                                        <span className="flex items-center gap-1">
                                                            {getTypeIcon(
                                                                materialType
                                                            )}
                                                            <span className="capitalize">
                                                                {materialType}
                                                            </span>
                                                        </span>
                                                    </Badge>
                                                </div>
                                                <CardDescription>
                                                    Source: {material.source}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p>{material.properties}</p>
                                            </CardContent>
                                        </Card>
                                    );
                                })
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center py-8 text-center">
                                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium">
                                        No materials found
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Try adjusting your search or filter to
                                        find what you re looking for.
                                    </p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </Tabs>
        </div>
    );
}
