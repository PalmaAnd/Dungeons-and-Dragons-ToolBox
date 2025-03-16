"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    User,
    Scroll,
    Sparkles,
    Heart,
    Briefcase,
    Target,
    Lightbulb,
    RefreshCw,
    Printer,
} from "lucide-react";

type NPCData = {
    races: {
        name: string;
        description: string;
        traits: string[];
    }[];
    classes: {
        name: string;
        description: string;
        skills: string[];
    }[];
    alignments: {
        name: string;
        description: string;
    }[];
    traits: string[];
    quirks: string[];
    occupations: string[];
    goals: string[];
    namePrefixes: string[];
    nameSuffixes: string[];
};

type NPC = {
    name: string;
    race: {
        name: string;
        description: string;
        traits: string[];
    };
    class: {
        name: string;
        description: string;
        skills: string[];
    };
    alignment: {
        name: string;
        description: string;
    };
    trait: string;
    quirk: string;
    occupation: string;
    goal: string;
    appearance: string;
    personality: string;
};

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function generateAppearance(race: string): string {
    const heights = ["short", "average height", "tall", "very tall"];
    const builds = ["slender", "athletic", "stocky", "muscular", "plump"];
    const hairColors = ["black", "brown", "blonde", "red", "gray", "white"];
    const hairStyles = [
        "long",
        "short",
        "braided",
        "curly",
        "straight",
        "wild",
        "balding",
    ];
    const eyeColors = ["brown", "blue", "green", "hazel", "amber", "gray"];
    const skinTones = ["pale", "fair", "tan", "olive", "brown", "dark"];
    const distinguishingFeatures = [
        "a scar across their cheek",
        "a missing finger",
        "heterochromia (different colored eyes)",
        "intricate tattoos",
        "unusually bright eyes",
        "a birthmark on their face",
        "a perpetual smile",
        "a serious expression",
        "jewelry from their homeland",
        "traditional clothing",
    ];

    // Adjust based on race
    let raceSpecific = "";
    switch (race) {
        case "Elf":
            raceSpecific = " with pointed ears and an ageless quality";
            break;
        case "Dwarf":
            raceSpecific = " with a full beard and sturdy frame";
            break;
        case "Halfling":
            raceSpecific = " with large hairy feet and a cheerful demeanor";
            break;
        case "Dragonborn":
            raceSpecific = " with scales and draconic features";
            break;
        case "Tiefling":
            raceSpecific =
                " with small horns and a hint of the infernal in their eyes";
            break;
        default:
            raceSpecific = "";
    }

    return `A ${getRandomItem(heights)}, ${getRandomItem(
        builds
    )} individual${raceSpecific} with ${getRandomItem(
        hairStyles
    )} ${getRandomItem(hairColors)} hair, ${getRandomItem(
        eyeColors
    )} eyes, and ${getRandomItem(skinTones)} skin. They have ${getRandomItem(
        distinguishingFeatures
    )}.`;
}

function generatePersonality(trait: string, alignment: string): string {
    const personalities = [
        "They speak with confidence and maintain eye contact.",
        "They're soft-spoken but choose their words carefully.",
        "They gesticulate wildly when excited about a topic.",
        "They have a booming laugh that fills the room.",
        "They're constantly fidgeting or playing with something in their hands.",
        "They choose their words carefully and speak precisely.",
        "They use colorful metaphors from their homeland.",
        "They frequently reference historical events or figures.",
        "They're quick to offer help to those in need.",
        "They're suspicious of strangers until they prove themselves.",
        "They collect small trinkets that remind them of their travels.",
        "They're always planning their next move or adventure.",
    ];

    return `${getRandomItem(
        personalities
    )} Their ${trait.toLowerCase()} nature is evident in how they interact with others, and their ${alignment.toLowerCase()} alignment guides their decisions.`;
}

export function NPCGenerator() {
    const [npcData, setNpcData] = useState<NPCData | null>(null);
    const [npc, setNPC] = useState<NPC | null>(null);
    const [selectedRace, setSelectedRace] = useState<string>("");
    const [selectedClass, setSelectedClass] = useState<string>("");
    const [selectedAlignment, setSelectedAlignment] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Load the NPC data
        const loadNpcData = async () => {
            try {
                const response = await fetch("/data/npc-generator.json");
                const data = await response.json();
                setNpcData(data);
            } catch (error) {
                console.error("Failed to load NPC data:", error);
            }
        };

        loadNpcData();
    }, []);

    const generateName = () => {
        if (!npcData) return "Unknown";

        const prefix = getRandomItem(npcData.namePrefixes);
        const suffix = getRandomItem(npcData.nameSuffixes);
        return prefix + suffix;
    };

    const generateNPC = () => {
        if (!npcData) return;

        setIsLoading(true);

        setTimeout(() => {
            const race = selectedRace
                ? npcData.races.find((r) => r.name === selectedRace) ||
                  getRandomItem(npcData.races)
                : getRandomItem(npcData.races);

            const characterClass = selectedClass
                ? npcData.classes.find((c) => c.name === selectedClass) ||
                  getRandomItem(npcData.classes)
                : getRandomItem(npcData.classes);

            const alignment = selectedAlignment
                ? npcData.alignments.find(
                      (a) => a.name === selectedAlignment
                  ) || getRandomItem(npcData.alignments)
                : getRandomItem(npcData.alignments);

            const newNPC: NPC = {
                name: generateName(),
                race,
                class: characterClass,
                alignment,
                trait: getRandomItem(npcData.traits),
                quirk: getRandomItem(npcData.quirks),
                occupation: getRandomItem(npcData.occupations),
                goal: getRandomItem(npcData.goals),
                appearance: generateAppearance(race.name),
                personality: generatePersonality(
                    getRandomItem(npcData.traits),
                    alignment.name
                ),
            };

            setNPC(newNPC);
            setIsLoading(false);
        }, 500); // Simulate loading for better UX
    };

    const regenerateSection = (section: keyof NPC) => {
        if (!npc || !npcData) return;

        const newNPC = { ...npc };

        switch (section) {
            case "name":
                newNPC.name = generateName();
                break;
            case "race":
                newNPC.race = getRandomItem(npcData.races);
                newNPC.appearance = generateAppearance(newNPC.race.name);
                break;
            case "class":
                newNPC.class = getRandomItem(npcData.classes);
                break;
            case "alignment":
                newNPC.alignment = getRandomItem(npcData.alignments);
                newNPC.personality = generatePersonality(
                    newNPC.trait,
                    newNPC.alignment.name
                );
                break;
            case "trait":
                newNPC.trait = getRandomItem(npcData.traits);
                newNPC.personality = generatePersonality(
                    newNPC.trait,
                    newNPC.alignment.name
                );
                break;
            case "quirk":
                newNPC.quirk = getRandomItem(npcData.quirks);
                break;
            case "occupation":
                newNPC.occupation = getRandomItem(npcData.occupations);
                break;
            case "goal":
                newNPC.goal = getRandomItem(npcData.goals);
                break;
            case "appearance":
                newNPC.appearance = generateAppearance(newNPC.race.name);
                break;
            case "personality":
                newNPC.personality = generatePersonality(
                    newNPC.trait,
                    newNPC.alignment.name
                );
                break;
        }

        setNPC(newNPC);
    };

    const printNPC = () => {
        if (!npc) return;

        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        const content = `
      <html>
        <head>
          <title>${npc.name} - NPC Character Sheet</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
            h2 { color: #444; margin-top: 20px; }
            .section { margin-bottom: 20px; }
            .trait { font-style: italic; }
            .quirk { font-style: italic; color: #555; }
          </style>
        </head>
        <body>
          <h1>${npc.name}</h1>
          <div class="section">
            <h2>Basic Information</h2>
            <p><strong>Race:</strong> ${npc.race.name}</p>
            <p><strong>Class:</strong> ${npc.class.name}</p>
            <p><strong>Alignment:</strong> ${npc.alignment.name}</p>
            <p><strong>Occupation:</strong> ${npc.occupation}</p>
          </div>
          <div class="section">
            <h2>Description</h2>
            <p>${npc.appearance}</p>
            <p>${npc.personality}</p>
          </div>
          <div class="section">
            <h2>Characteristics</h2>
            <p><strong>Trait:</strong> <span class="trait">${npc.trait}</span></p>
            <p><strong>Quirk:</strong> <span class="quirk">${npc.quirk}</span></p>
            <p><strong>Goal:</strong> ${npc.goal}</p>
          </div>
          <div class="section">
            <h2>Additional Notes</h2>
            <p><strong>Race Description:</strong> ${npc.race.description}</p>
            <p><strong>Class Description:</strong> ${npc.class.description}</p>
            <p><strong>Alignment Description:</strong> ${npc.alignment.description}</p>
          </div>
        </body>
      </html>
    `;

        printWindow.document.open();
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                <div className="grid gap-2 flex-1">
                    <h1 className="text-3xl font-bold">NPC Generator</h1>
                    <p className="text-muted-foreground">
                        Create detailed non-player characters for your campaign.
                    </p>
                </div>
                <div className="flex gap-2">
                    {npc && (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={printNPC}
                            >
                                <Printer className="h-4 w-4 mr-2" />
                                Print
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setNPC(null)}
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Reset
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Generate an NPC</CardTitle>
                    <CardDescription>
                        Customize your NPC generation or randomize everything.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {npcData && (
                            <>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">
                                        Race (Optional)
                                    </label>
                                    <Select
                                        value={selectedRace}
                                        onValueChange={setSelectedRace}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Any race" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="any">
                                                Any race
                                            </SelectItem>
                                            {npcData.races.map((race) => (
                                                <SelectItem
                                                    key={race.name}
                                                    value={race.name}
                                                >
                                                    {race.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">
                                        Class (Optional)
                                    </label>
                                    <Select
                                        value={selectedClass}
                                        onValueChange={setSelectedClass}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Any class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="any">
                                                Any class
                                            </SelectItem>
                                            {npcData.classes.map((cls) => (
                                                <SelectItem
                                                    key={cls.name}
                                                    value={cls.name}
                                                >
                                                    {cls.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">
                                        Alignment (Optional)
                                    </label>
                                    <Select
                                        value={selectedAlignment}
                                        onValueChange={setSelectedAlignment}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Any alignment" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="any">
                                                Any alignment
                                            </SelectItem>
                                            {npcData.alignments.map(
                                                (alignment) => (
                                                    <SelectItem
                                                        key={alignment.name}
                                                        value={alignment.name}
                                                    >
                                                        {alignment.name}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={generateNPC}
                        className="w-full"
                        disabled={isLoading || !npcData}
                    >
                        {isLoading ? "Generating..." : "Generate NPC"}
                    </Button>
                </CardFooter>
            </Card>

            {npc && (
                <Card className="overflow-hidden">
                    <CardHeader className="bg-primary/5">
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    {npc.name}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() =>
                                            regenerateSection("name")
                                        }
                                    >
                                        <RefreshCw className="h-3 w-3" />
                                        <span className="sr-only">
                                            Regenerate name
                                        </span>
                                    </Button>
                                </CardTitle>
                                <CardDescription>
                                    {npc.race.name} {npc.class.name},{" "}
                                    {npc.alignment.name}
                                </CardDescription>
                            </div>
                            <div>
                                <Badge variant="outline" className="ml-2">
                                    {npc.occupation}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Tabs defaultValue="details">
                            <TabsList className="w-full rounded-none border-b">
                                <TabsTrigger value="details" className="flex-1">
                                    Details
                                </TabsTrigger>
                                <TabsTrigger
                                    value="appearance"
                                    className="flex-1"
                                >
                                    Appearance
                                </TabsTrigger>
                                <TabsTrigger
                                    value="background"
                                    className="flex-1"
                                >
                                    Background
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent
                                value="details"
                                className="p-6 space-y-4"
                            >
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-primary" />
                                            <h3 className="font-semibold">
                                                Race
                                            </h3>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 ml-auto"
                                                onClick={() =>
                                                    regenerateSection("race")
                                                }
                                            >
                                                <RefreshCw className="h-3 w-3" />
                                                <span className="sr-only">
                                                    Regenerate race
                                                </span>
                                            </Button>
                                        </div>
                                        <p className="mt-1 text-sm">
                                            {npc.race.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {npc.race.traits.map((trait, i) => (
                                                <Badge
                                                    key={i}
                                                    variant="secondary"
                                                >
                                                    {trait}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Scroll className="h-4 w-4 text-primary" />
                                            <h3 className="font-semibold">
                                                Class
                                            </h3>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 ml-auto"
                                                onClick={() =>
                                                    regenerateSection("class")
                                                }
                                            >
                                                <RefreshCw className="h-3 w-3" />
                                                <span className="sr-only">
                                                    Regenerate class
                                                </span>
                                            </Button>
                                        </div>
                                        <p className="mt-1 text-sm">
                                            {npc.class.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {npc.class.skills.map(
                                                (skill, i) => (
                                                    <Badge
                                                        key={i}
                                                        variant="secondary"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="h-4 w-4 text-primary" />
                                            <h3 className="font-semibold">
                                                Alignment
                                            </h3>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 ml-auto"
                                                onClick={() =>
                                                    regenerateSection(
                                                        "alignment"
                                                    )
                                                }
                                            >
                                                <RefreshCw className="h-3 w-3" />
                                                <span className="sr-only">
                                                    Regenerate alignment
                                                </span>
                                            </Button>
                                        </div>
                                        <p className="mt-1 text-sm">
                                            {npc.alignment.description}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Heart className="h-4 w-4 text-primary" />
                                            <h3 className="font-semibold">
                                                Personality Trait
                                            </h3>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 ml-auto"
                                                onClick={() =>
                                                    regenerateSection("trait")
                                                }
                                            >
                                                <RefreshCw className="h-3 w-3" />
                                                <span className="sr-only">
                                                    Regenerate trait
                                                </span>
                                            </Button>
                                        </div>
                                        <p className="mt-1 text-sm">
                                            {npc.trait}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-4 w-4 text-primary" />
                                            <h3 className="font-semibold">
                                                Occupation
                                            </h3>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 ml-auto"
                                                onClick={() =>
                                                    regenerateSection(
                                                        "occupation"
                                                    )
                                                }
                                            >
                                                <RefreshCw className="h-3 w-3" />
                                                <span className="sr-only">
                                                    Regenerate occupation
                                                </span>
                                            </Button>
                                        </div>
                                        <p className="mt-1 text-sm">
                                            {npc.occupation}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Target className="h-4 w-4 text-primary" />
                                            <h3 className="font-semibold">
                                                Goal
                                            </h3>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 ml-auto"
                                                onClick={() =>
                                                    regenerateSection("goal")
                                                }
                                            >
                                                <RefreshCw className="h-3 w-3" />
                                                <span className="sr-only">
                                                    Regenerate goal
                                                </span>
                                            </Button>
                                        </div>
                                        <p className="mt-1 text-sm">
                                            {npc.goal}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <div className="flex items-center gap-2">
                                        <Lightbulb className="h-4 w-4 text-primary" />
                                        <h3 className="font-semibold">Quirk</h3>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 ml-auto"
                                            onClick={() =>
                                                regenerateSection("quirk")
                                            }
                                        >
                                            <RefreshCw className="h-3 w-3" />
                                            <span className="sr-only">
                                                Regenerate quirk
                                            </span>
                                        </Button>
                                    </div>
                                    <p className="mt-1 text-sm">{npc.quirk}</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="appearance" className="p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold">
                                        Physical Description
                                    </h3>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 ml-auto"
                                        onClick={() =>
                                            regenerateSection("appearance")
                                        }
                                    >
                                        <RefreshCw className="h-3 w-3" />
                                        <span className="sr-only">
                                            Regenerate appearance
                                        </span>
                                    </Button>
                                </div>
                                <p className="text-sm">{npc.appearance}</p>

                                <Separator className="my-4" />

                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold">
                                        Personality
                                    </h3>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 ml-auto"
                                        onClick={() =>
                                            regenerateSection("personality")
                                        }
                                    >
                                        <RefreshCw className="h-3 w-3" />
                                        <span className="sr-only">
                                            Regenerate personality
                                        </span>
                                    </Button>
                                </div>
                                <p className="text-sm">{npc.personality}</p>
                            </TabsContent>

                            <TabsContent value="background" className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Suggested Background
                                        </h3>
                                        <p className="text-sm">
                                            {npc.name} grew up in a{" "}
                                            {npc.race.name.toLowerCase()}{" "}
                                            community where they learned the
                                            ways of the{" "}
                                            {npc.class.name.toLowerCase()}.
                                            Their {npc.trait.toLowerCase()}{" "}
                                            nature made them stand out among
                                            their peers. Now working as a{" "}
                                            {npc.occupation.toLowerCase()}, they{" "}
                                            {npc.goal
                                                .toLowerCase()
                                                .startsWith("to ")
                                                ? npc.goal.toLowerCase()
                                                : `aim to ${npc.goal.toLowerCase()}`}
                                            .
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Roleplaying Tips
                                        </h3>
                                        <ul className="text-sm space-y-2 list-disc pl-5">
                                            <li>
                                                Remember their quirk:{" "}
                                                {npc.quirk}
                                            </li>
                                            <li>
                                                Their {npc.alignment.name}{" "}
                                                alignment influences their
                                                decisions
                                            </li>
                                            <li>
                                                They have skills related to
                                                being a {npc.class.name}:{" "}
                                                {npc.class.skills.join(", ")}
                                            </li>
                                            <li>
                                                Their occupation as a{" "}
                                                {npc.occupation} gives them
                                                specific knowledge and
                                                connections
                                            </li>
                                            <li>
                                                Their goal to{" "}
                                                {npc.goal.toLowerCase()}{" "}
                                                motivates many of their actions
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Adventure Hooks
                                        </h3>
                                        <ul className="text-sm space-y-2 list-disc pl-5">
                                            <li>
                                                {npc.name} needs help achieving
                                                their goal to{" "}
                                                {npc.goal.toLowerCase()}
                                            </li>
                                            <li>
                                                Their quirk (
                                                {npc.quirk.toLowerCase()}) has
                                                gotten them into trouble
                                            </li>
                                            <li>
                                                Their skills as a{" "}
                                                {npc.class.name} are needed for
                                                a special task
                                            </li>
                                            <li>
                                                Their {npc.race.name} heritage
                                                gives them unique insight into a
                                                current problem
                                            </li>
                                            <li>
                                                Their occupation as a{" "}
                                                {npc.occupation} has put them in
                                                possession of valuable
                                                information
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
