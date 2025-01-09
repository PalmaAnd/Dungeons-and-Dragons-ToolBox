"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";

export function Navbar() {
    const { user, isLoading } = useUser();
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                                Tools <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Link href="/tools">All Tools</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/tools/battle-map-generator">
                                    Battle Map Generator
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/tools/dice-roller">
                                    Dice Roller
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/tools/initiative-tracker">
                                    Initiative Tracker
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/tools/loot-generator">
                                    Loot Generator
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/tools/npc-generator">
                                    NPC Generator
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/tools/tavern-generator">
                                    Tavern Generator
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/tools/weather-generator">
                                    Weather Generator
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {!isLoading && !user && (
                        <Button id="qsLoginBtn">
                            <Link
                                href="/api/auth/login"
                                className="btn btn-primary btn-margin"
                                tabIndex={0}
                            >
                                Log in
                            </Link>
                        </Button>
                    )}
                    {user && (
                        <DropdownMenu>
                            <DropdownMenuItem>{user.name}</DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem id="qsLogoutBtn">
                                <Link href="/api/auth/logout">Log out</Link>
                            </DropdownMenuItem>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </nav>
    );
}
