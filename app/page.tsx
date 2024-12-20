import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome to D&D Toolbox</h1>
            <p className="text-xl mb-8 text-muted-foreground">
                Your ultimate companion for Dungeons and Dragons adventures
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
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
                <Link href="/tools" className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                        Tools
                    </Button>
                </Link>
            </div>
        </div>
    )
}

