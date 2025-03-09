"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const tools = [
    { name: "Backstory Generator", href: "/tools/backstory-generator" },
    { name: "Dice Roller", href: "/tools/dice-roller" },
    { name: "Initiative Tracker", href: "/tools/initiative-tracker" },
    { name: "Loot Generator", href: "/tools/loot-generator" },
    { name: "NPC Generator", href: "/tools/npc-generator" },
    { name: "Magic Item Shop", href: "/tools/magic-item-shop" },
    { name: "Tavern Generator", href: "/tools/tavern-generator" },
    { name: "Weather Generator", href: "/tools/weather-generator" },
];

export function ToolsSidebar() {
    const pathname = usePathname();
    const isMobile = useIsMobile();

    if (isMobile) {
        return null; // Don't render sidebar on mobile, we use mobile menu instead
    }

    return (
        <nav className="w-64 bg-card p-4" aria-label="Tools Navigation">
            <h2 className="text-lg font-semibold mb-4">Tools</h2>
            <ul className="space-y-2">
                {tools.map((tool) => (
                    <li key={tool.href}>
                        <Link
                            href={tool.href}
                            className={cn(
                                "block p-2 rounded-lg transition-colors",
                                pathname === tool.href
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent hover:text-accent-foreground"
                            )}
                            aria-current={
                                pathname === tool.href ? "page" : undefined
                            }
                        >
                            {tool.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
