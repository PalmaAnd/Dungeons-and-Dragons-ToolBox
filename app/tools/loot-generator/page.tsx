'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const commonItems = ['Potion of Healing', 'Rope', 'Torch', 'Backpack', 'Bedroll', 'Rations (1 day)', 'Waterskin']
const uncommonItems = ['Potion of Greater Healing', 'Bag of Holding', 'Boots of Elvenkind', 'Cloak of Elvenkind', 'Wand of Magic Missiles']
const rareItems = ['Flame Tongue', 'Ring of Protection', 'Staff of the Woodlands', 'Wand of Fireballs', 'Wings of Flying']
const veryRareItems = ['Cloak of Invisibility', 'Rod of Lordly Might', 'Staff of Power', 'Vorpal Sword']
const legendaryItems = ['Holy Avenger', 'Ring of Djinni Summoning', 'Sphere of Annihilation', 'Talisman of Pure Good']

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
}

function getRandomGold(tier: string): number {
    switch (tier) {
        case 'low':
            return Math.floor(Math.random() * 100) + 10
        case 'medium':
            return Math.floor(Math.random() * 500) + 100
        case 'high':
            return Math.floor(Math.random() * 1000) + 500
        default:
            return 0
    }
}

type Loot = {
    gold: number
    items: string[]
}

export default function LootGenerator() {
    const [loot, setLoot] = useState<Loot | null>(null)
    const [tier, setTier] = useState<string>('low')

    const generateLoot = () => {
        const gold = getRandomGold(tier)
        let items: string[] = []

        switch (tier) {
            case 'low':
                items = [getRandomItem(commonItems), getRandomItem(commonItems)]
                if (Math.random() < 0.2) items.push(getRandomItem(uncommonItems))
                break
            case 'medium':
                items = [getRandomItem(uncommonItems), getRandomItem(uncommonItems)]
                if (Math.random() < 0.3) items.push(getRandomItem(rareItems))
                break
            case 'high':
                items = [getRandomItem(rareItems), getRandomItem(veryRareItems)]
                if (Math.random() < 0.1) items.push(getRandomItem(legendaryItems))
                break
        }

        setLoot({ gold, items })
    }

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold mb-4">Loot Generator</h1>
            <div className="flex items-center space-x-4">
                <Select value={tier} onValueChange={setTier}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Low Tier</SelectItem>
                        <SelectItem value="medium">Medium Tier</SelectItem>
                        <SelectItem value="high">High Tier</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={generateLoot}>Generate Loot</Button>
            </div>
            {loot && (
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Loot</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p><strong>Gold:</strong> {loot.gold} gp</p>
                        <p><strong>Items:</strong></p>
                        <ul className="list-disc pl-5">
                            {loot.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

