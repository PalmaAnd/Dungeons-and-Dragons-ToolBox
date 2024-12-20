"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="border-b bg-background">
            <div className="container flex h-16 items-center px-4">
                <Link href="/" className="text-xl font-bold">
                    D&D Toolbox
                </Link>
                <div className="ml-auto hidden md:flex space-x-4">
                    <Button variant="ghost" asChild>
                        <Link href="/character-creator">Character Creator</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/spell-list">Spell List</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/monster-compendium">
                            Monster Compendium
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/dice-roller">Dice Roller</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/campaign-manager">Campaign Manager</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/initiative-tracker">Initiative Tracker</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/auth">Login/Register</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
