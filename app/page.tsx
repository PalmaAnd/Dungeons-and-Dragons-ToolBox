import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome to D&D Toolbox</h1>
            <p className="text-xl mb-8 text-muted-foreground">
                Your ultimate companion for Dungeons and Dragons adventures
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                <Link href="/character-creator" className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                        Create a Character
                    </Button>
                </Link>
                <Link href="/spell-list" className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                        Browse Spells
                    </Button>
                </Link>
                <Link href="/monster-compendium" className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                        Monster Compendium
                    </Button>
                </Link>
                <Link href="/dice-roller" className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                        Roll Dice
                    </Button>
                </Link>
            </div>
        </div>
    );
}
