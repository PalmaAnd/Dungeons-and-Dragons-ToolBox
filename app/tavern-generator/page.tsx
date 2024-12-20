'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Beer, Users, Utensils, Music, Volume2 } from 'lucide-react'

const tavernNames = [
    "The Prancing Pony", "The Green Dragon", "The Leaky Cauldron", "The Rusty Nail",
    "The Drunken Clam", "The Salty Sailor", "The Winking Skeever", "The Eolian",
    "The Bannered Mare", "The Sleeping Giant"
]

const tavernTypes = ["Inn", "Pub", "Tavern", "Alehouse", "Brewery"]

const atmospheres = ["Cozy", "Rowdy", "Mysterious", "Elegant", "Seedy"]

const specialties = [
    "Hearty stew", "Exotic ales", "Spiced wine", "Roasted meats", "Freshly baked pies",
    "Seafood platter", "Vegetarian feast", "Dragon pepper wings", "Dwarven ale",
    "Elven bread"
]

const entertainments = [
    "Live bard performances", "Dice games", "Arm wrestling contests", "Storytelling nights",
    "Magic shows", "Dancing", "Trivia contests", "Karaoke nights", "Poetry readings",
    "Puppet shows"
]

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
}

export default function TavernGenerator() {
    const [tavern, setTavern] = useState<{
        name: string
        type: string
        atmosphere: string
        specialty: string
        entertainment: string
        patronCount: number
    } | null>(null)

    const generateTavern = () => {
        setTavern({
            name: getRandomItem(tavernNames),
            type: getRandomItem(tavernTypes),
            atmosphere: getRandomItem(atmospheres),
            specialty: getRandomItem(specialties),
            entertainment: getRandomItem(entertainments),
            patronCount: Math.floor(Math.random() * 50) + 10
        })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Tavern Generator</h1>

            <Button onClick={generateTavern} className="w-full mb-6">Generate Tavern</Button>

            {tavern && (
                <Card>
                    <CardHeader>
                        <CardTitle>{tavern.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Beer className="h-5 w-5" />
                            <span>{tavern.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Volume2 className="h-5 w-5" />
                            <span>{tavern.atmosphere} atmosphere</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Utensils className="h-5 w-5" />
                            <span>Specialty: {tavern.specialty}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Music className="h-5 w-5" />
                            <span>Entertainment: {tavern.entertainment}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Users className="h-5 w-5" />
                            <span>Current patrons: {tavern.patronCount}</span>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

