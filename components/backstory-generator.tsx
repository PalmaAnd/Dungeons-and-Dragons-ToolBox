"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const origins = [
    "You were born into nobility, but lost everything due to a family scandal.",
    "You grew up on the streets, learning to survive by your wits.",
    "You were raised in a secluded monastery, trained in ancient traditions.",
    "You come from a long line of soldiers and were expected to follow in their footsteps.",
    "You were found as an infant in the depths of a mysterious forest.",
];

const motivations = [
    "You seek revenge against those who wronged your family.",
    "You're on a quest to uncover a long-lost artifact of immense power.",
    "You want to prove yourself worthy of a prophecy that foretells your greatness.",
    "You're searching for a cure to a rare disease that afflicts your loved one.",
    "You aim to become the greatest in your chosen profession or craft.",
];

const events = [
    "You witnessed a crime committed by a powerful figure and now hold a dangerous secret.",
    "You accidentally activated an ancient magical artifact, gaining both power and a curse.",
    "You survived a catastrophic event that destroyed your hometown.",
    "You made a pact with a mysterious entity, granting you abilities but at a cost.",
    "You discovered you have a long-lost sibling and are now searching for them.",
];

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function BackstoryGenerator() {
    const [backstory, setBackstory] = useState<{
        origin: string;
        motivation: string;
        event: string;
    } | null>(null);

    const generateBackstory = () => {
        setBackstory({
            origin: getRandomItem(origins),
            motivation: getRandomItem(motivations),
            event: getRandomItem(events),
        });
    };

    return (
        <div className="space-y-6">
            <Button onClick={generateBackstory}>Generate Backstory</Button>
            {backstory && (
                <Card>
                    <CardHeader>
                        <CardTitle>Your Character Backstory</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Origin:</h3>
                            <p>{backstory.origin}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Motivation:</h3>
                            <p>{backstory.motivation}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">
                                Significant Event:
                            </h3>
                            <p>{backstory.event}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
