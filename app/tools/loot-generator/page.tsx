"use client";

import { LootGenerator } from "@/components/loot-generator";

export default function LootGeneratorPage() {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold mb-4">Loot Generator</h1>
            <div className="container mx-auto px-4 py-8">
                <LootGenerator />
            </div>
        </div>
    );
}
