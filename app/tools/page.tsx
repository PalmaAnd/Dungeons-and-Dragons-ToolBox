import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ToolsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">D&D Tools</h1>
            <p className="text-xl text-muted-foreground">
                Select a tool to get started with your adventure
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/tools/dice-roller" className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                        Dice Roller
                    </Button>
                </Link>
                <Link href="/tools/initiative-tracker" className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                        Initiative Tracker
                    </Button>
                </Link>
                <Link href="/tools/loot-generator" className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                        Loot Generator
                    </Button>
                </Link>
                <Link href="/tools/npc-generator" className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                        NPC Generator
                    </Button>
                </Link>
                <Link href="/tools/tavern-generator" className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                        Tavern Generator
                    </Button>
                </Link>
                <Link href="/tools/weather-generator" className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                        Weather Generator
                    </Button>
                </Link>
            </div>
        </div>
    )
}

