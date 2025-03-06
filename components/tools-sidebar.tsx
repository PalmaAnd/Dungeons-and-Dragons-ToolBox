"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tools = [
    { name: "Dice Roller", href: "/tools/dice-roller" },
    { name: "Initiative Tracker", href: "/tools/initiative-tracker" },
    { name: "Loot Generator", href: "/tools/loot-generator" },
    { name: "NPC Generator", href: "/tools/npc-generator" },
    { name: "Tavern Generator", href: "/tools/tavern-generator" },
    { name: "Weather Generator", href: "/tools/weather-generator" },
];

export function ToolsSidebar() {
    const pathname = usePathname();

    return (
        <nav className="w-64 bg-gray-100 p-4">
            <h2 className="text-lg font-semibold mb-4">Tools</h2>
            <ul className="space-y-2">
                {tools.map((tool) => (
                    <li key={tool.href}>
                        <Link
                            href={tool.href}
                            className={cn(
                                "block p-2 rounded-lg",
                                pathname === tool.href
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-gray-200"
                            )}
                        >
                            {tool.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
