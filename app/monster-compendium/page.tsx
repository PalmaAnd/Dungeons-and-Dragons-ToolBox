import { MonsterCompendium } from "@/components/monster-compendium";
import monstersData from "@/data/monsters.json";

export default function MonsterCompendiumPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Monster Compendium</h1>
            <p className="mb-6">
                Browse and search through a collection of monsters for your D&D
                campaign. View detailed stat blocks, abilities, and more.
            </p>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <MonsterCompendium monsters={monstersData} />
        </div>
    );
}
