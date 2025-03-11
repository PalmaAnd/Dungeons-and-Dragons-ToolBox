"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Beer,
    Users,
    Utensils,
    Music,
    Volume2,
    User,
    MapPin,
    Star,
} from "lucide-react";

const tavernNames = [
    "The Prancing Pony",
    "The Green Dragon",
    "The Leaky Cauldron",
    "The Rusty Nail",
    "The Drunken Clam",
    "The Salty Sailor",
    "The Winking Skeever",
    "The Eolian",
    "The Bannered Mare",
    "The Sleeping Giant",
];

const tavernTypes = ["Inn", "Pub", "Tavern", "Alehouse", "Brewery"];

const atmospheres = ["Cozy", "Rowdy", "Mysterious", "Elegant", "Seedy"];

const specialties = [
    "Hearty stew",
    "Exotic ales",
    "Spiced wine",
    "Roasted meats",
    "Freshly baked pies",
    "Seafood platter",
    "Vegetarian feast",
    "Dragon pepper wings",
    "Dwarven ale",
    "Elven bread",
];

const entertainments = [
    "Live bard performances",
    "Dice games",
    "Arm wrestling contests",
    "Storytelling nights",
    "Magic shows",
    "Dancing",
    "Trivia contests",
    "Karaoke nights",
    "Poetry readings",
    "Puppet shows",
];

const owners = [
    "John the Brave",
    "Elena the Wise",
    "Gorim the Strong",
    "Lila the Swift",
    "Thorin the Stout",
];

const locations = [
    "Near the city gate",
    "In the heart of the market",
    "By the river",
    "On the outskirts of town",
    "Next to the blacksmith",
];

const reputations = [
    "Well-known for its hospitality",
    "Feared for its rowdy patrons",
    "Famous for its delicious food",
    "Renowned for its entertainment",
    "Infamous for its shady dealings",
];

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export default function TavernGenerator() {
    const [tavern, setTavern] = useState<{
        name: string;
        type: string;
        atmosphere: string;
        specialty: string;
        entertainment: string;
        patronCount: number;
        owner: string;
        location: string;
        reputation: string;
    } | null>(null);

    const [savedTaverns, setSavedTaverns] = useState<
        {
            name: string;
            type: string;
            atmosphere: string;
            specialty: string;
            entertainment: string;
            patronCount: number;
            owner: string;
            location: string;
            reputation: string;
        }[]
    >([]);

    useEffect(() => {
        const storedTaverns = localStorage.getItem("savedTaverns");
        if (storedTaverns) {
            setSavedTaverns(JSON.parse(storedTaverns));
        }
    }, []);

    const generateTavern = () => {
        setTavern({
            name: getRandomItem(tavernNames),
            type: getRandomItem(tavernTypes),
            atmosphere: getRandomItem(atmospheres),
            specialty: getRandomItem(specialties),
            entertainment: getRandomItem(entertainments),
            patronCount: Math.floor(Math.random() * 50) + 10,
            owner: getRandomItem(owners),
            location: getRandomItem(locations),
            reputation: getRandomItem(reputations),
        });
    };

    const saveTavern = () => {
        if (tavern) {
            const updatedTaverns = [...savedTaverns, tavern];
            setSavedTaverns(updatedTaverns);
            localStorage.setItem(
                "savedTaverns",
                JSON.stringify(updatedTaverns)
            );
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Tavern Generator</h1>

            <Button onClick={generateTavern} className="w-full mb-6">
                Generate Tavern
            </Button>

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
                        <div className="flex items-center space-x-2">
                            <User className="h-5 w-5" />
                            <span>Owner: {tavern.owner}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5" />
                            <span>Location: {tavern.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Star className="h-5 w-5" />
                            <span>Reputation: {tavern.reputation}</span>
                        </div>
                    </CardContent>
                </Card>
            )}

            {tavern && (
                <Button onClick={saveTavern} className="w-full mt-4">
                    Save Tavern
                </Button>
            )}

            {savedTaverns.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Saved Taverns</h2>
                    {savedTaverns.map((savedTavern, index) => (
                        <Card key={index} className="mb-4">
                            <CardHeader>
                                <CardTitle>{savedTavern.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Beer className="h-5 w-5" />
                                    <span>{savedTavern.type}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Volume2 className="h-5 w-5" />
                                    <span>
                                        {savedTavern.atmosphere} atmosphere
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Utensils className="h-5 w-5" />
                                    <span>
                                        Specialty: {savedTavern.specialty}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Music className="h-5 w-5" />
                                    <span>
                                        Entertainment:{" "}
                                        {savedTavern.entertainment}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Users className="h-5 w-5" />
                                    <span>
                                        Current patrons:{" "}
                                        {savedTavern.patronCount}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <User className="h-5 w-5" />
                                    <span>Owner: {savedTavern.owner}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-5 w-5" />
                                    <span>
                                        Location: {savedTavern.location}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Star className="h-5 w-5" />
                                    <span>
                                        Reputation: {savedTavern.reputation}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
