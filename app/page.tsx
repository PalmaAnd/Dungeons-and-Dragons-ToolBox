import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Welcome to D&D Toolbox
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl">
                Your ultimate companion for Dungeons and Dragons adventures
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
                <Link
                    href="/character-creator"
                    className="w-full"
                    aria-label="Create a Character"
                >
                    <Button variant="outline" size="lg" className="w-full">
                        Create a Character
                    </Button>
                </Link>
                <Link
                    href="/spell-list"
                    className="w-full"
                    aria-label="Browse Spells"
                >
                    <Button variant="outline" size="lg" className="w-full">
                        Browse Spells
                    </Button>
                </Link>
                <Link
                    href="/monster-compendium"
                    className="w-full"
                    aria-label="Monster Compendium"
                >
                    <Button variant="outline" size="lg" className="w-full">
                        Monster Compendium
                    </Button>
                </Link>
                <Link
                    href="/tools/initiative-tracker"
                    className="w-full"
                    aria-label="Initiative Tracker"
                >
                    <Button variant="outline" size="lg" className="w-full">
                        Initiative Tracker
                    </Button>
                </Link>
                <Link
                    href="/tools/dice-roller"
                    className="w-full"
                    aria-label="Roll Dice"
                >
                    <Button variant="outline" size="lg" className="w-full">
                        Roll Dice
                    </Button>
                </Link>
                <Link
                    href="/tools/tavern-generator"
                    className="w-full"
                    aria-label="Tavern Generator"
                >
                    <Button variant="outline" size="lg" className="w-full">
                        Tavern Generator
                    </Button>
                </Link>
                <Link
                    href="/tools/weather-generator"
                    className="w-full"
                    aria-label="Weather Generator"
                >
                    <Button variant="outline" size="lg" className="w-full">
                        Weather Generator
                    </Button>
                </Link>
                <Link
                    href="/tools/magic-item-shop"
                    className="w-full"
                    aria-label="Magic Item Shop"
                >
                    <Button variant="outline" size="lg" className="w-full">
                        Magic Item Shop
                    </Button>
                </Link>
                <Link href="/tools" className="w-full" aria-label="More Tools">
                    <Button variant="outline" size="lg" className="w-full">
                        More Tools
                    </Button>
                </Link>
            </div>
        </div>
    );
}
