"use client";

import { LootGenerator } from "@/components/loot-generator";

export default function LootGeneratorPage() {
    return (
        <div className="space-y-4">
            <div className="container mx-auto px-4 py-8">
                <LootGenerator />
            </div>
        </div>
    );
}
