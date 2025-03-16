"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    origins,
    motivations,
    events,
    connections,
} from "@/data/backstory-generator.json";
import { Star, Heart, Shield, Users } from "lucide-react";

interface Backstory {
    origin: {
        text: string;
        hooks: string[];
    };
    motivation: {
        text: string;
        complications: string[];
    };
    event: {
        text: string;
        consequences: string[];
    };
    connection: {
        text: string;
        details: string[];
    };
}

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function BackstoryGenerator() {
    const [backstory, setBackstory] = useState<Backstory | null>(null);

    const generateBackstory = () => {
        setBackstory({
            origin: getRandomItem(origins),
            motivation: getRandomItem(motivations),
            event: getRandomItem(events),
            connection: getRandomItem(connections),
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
                            <h3 className="font-semibold flex items-center gap-2">
                                <Star className="h-5 w-5" />
                                Origin:
                            </h3>
                            <p>{backstory.origin.text}</p>
                            <ul className="list-disc list-inside">
                                {backstory.origin.hooks.map((hook, index) => (
                                    <li key={index}>{hook}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold flex items-center gap-2">
                                <Heart className="h-5 w-5" />
                                Motivation:
                            </h3>
                            <p>{backstory.motivation.text}</p>
                            <ul className="list-disc list-inside">
                                {backstory.motivation.complications.map(
                                    (complication, index) => (
                                        <li key={index}>{complication}</li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Significant Event:
                            </h3>
                            <p>{backstory.event.text}</p>
                            <ul className="list-disc list-inside">
                                {backstory.event.consequences.map(
                                    (consequence, index) => (
                                        <li key={index}>{consequence}</li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Connection:
                            </h3>
                            <p>{backstory.connection.text}</p>
                            <ul className="list-disc list-inside">
                                {backstory.connection.details.map(
                                    (detail, index) => (
                                        <li key={index}>{detail}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
