'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const races = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling']
const classes = ['Fighter', 'Wizard', 'Rogue', 'Cleric', 'Paladin', 'Ranger', 'Barbarian', 'Bard', 'Druid', 'Monk', 'Sorcerer', 'Warlock']
const alignments = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil']
const traits = ['Brave', 'Cautious', 'Cheerful', 'Rude', 'Honest', 'Loyal', 'Ambitious', 'Lazy', 'Curious', 'Stubborn']
const quirks = ['Always speaks in rhyme', 'Collects unusual rocks', 'Afraid of heights', 'Constantly checks the time', 'Speaks to inanimate objects', 'Always wears mismatched socks', 'Obsessed with cleanliness', 'Tells bad jokes', 'Whistles when nervous', 'Carries a lucky charm']

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
}

type NPC = {
    name: string
    race: string
    class: string
    alignment: string
    trait: string
    quirk: string
}

export default function NPCGenerator() {
    const [npc, setNPC] = useState<NPC | null>(null)

    const generateName = () => {
        const syllables = ['Al', 'Bar', 'Ced', 'Dor', 'El', 'Fal', 'Gor', 'Hel', 'Il', 'Jor', 'Kal', 'Lor', 'Mor', 'Nor', 'Ol', 'Per', 'Quin', 'Ral', 'Sal', 'Tal', 'Ul', 'Val', 'Wil', 'Xan', 'Yor', 'Zar']
        return getRandomItem(syllables) + getRandomItem(syllables).toLowerCase()
    }

    const generateNPC = () => {
        setNPC({
            name: generateName(),
            race: getRandomItem(races),
            class: getRandomItem(classes),
            alignment: getRandomItem(alignments),
            trait: getRandomItem(traits),
            quirk: getRandomItem(quirks)
        })
    }

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold mb-4">NPC Generator</h1>
            <Button onClick={generateNPC} className="w-full mb-4">Generate NPC</Button>
            {npc && (
                <Card>
                    <CardHeader>
                        <CardTitle>{npc.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p><strong>Race:</strong> {npc.race}</p>
                        <p><strong>Class:</strong> {npc.class}</p>
                        <p><strong>Alignment:</strong> {npc.alignment}</p>
                        <p><strong>Trait:</strong> {npc.trait}</p>
                        <p><strong>Quirk:</strong> {npc.quirk}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

