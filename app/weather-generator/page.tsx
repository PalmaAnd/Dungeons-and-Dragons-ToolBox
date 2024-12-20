'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind } from 'lucide-react'
import React from 'react'

type Climate = 'temperate' | 'tropical' | 'arid' | 'arctic'
type Season = 'spring' | 'summer' | 'autumn' | 'winter'

const climates: Climate[] = ['temperate', 'tropical', 'arid', 'arctic']
const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter']

const weatherTypes = {
    clear: { icon: Sun, label: 'Clear' },
    cloudy: { icon: Cloud, label: 'Cloudy' },
    rainy: { icon: CloudRain, label: 'Rainy' },
    stormy: { icon: CloudLightning, label: 'Stormy' },
    snowy: { icon: CloudSnow, label: 'Snowy' },
    windy: { icon: Wind, label: 'Windy' },
}

export default function WeatherGenerator() {
    const [climate, setClimate] = useState<Climate>('temperate')
    const [season, setSeason] = useState<Season>('spring')
    const [weather, setWeather] = useState<keyof typeof weatherTypes | null>(null)
    const [temperature, setTemperature] = useState<number | null>(null)

    const generateWeather = () => {
        let possibleWeather: (keyof typeof weatherTypes)[] = ['clear', 'cloudy', 'rainy', 'windy']
        let tempRange: [number, number] = [0, 0]

        switch (climate) {
            case 'temperate':
                if (season === 'winter') {
                    possibleWeather.push('snowy')
                    tempRange = [-5, 10]
                } else if (season === 'summer') {
                    tempRange = [15, 30]
                } else {
                    tempRange = [5, 20]
                }
                break
            case 'tropical':
                possibleWeather = ['clear', 'cloudy', 'rainy', 'stormy']
                tempRange = [20, 35]
                break
            case 'arid':
                possibleWeather = ['clear', 'windy']
                if (season === 'summer') {
                    tempRange = [30, 45]
                } else {
                    tempRange = [10, 25]
                }
                break
            case 'arctic':
                possibleWeather = ['clear', 'cloudy', 'snowy', 'windy']
                if (season === 'summer') {
                    tempRange = [-5, 10]
                } else {
                    tempRange = [-30, -10]
                }
                break
        }

        const randomWeather = possibleWeather[Math.floor(Math.random() * possibleWeather.length)]
        const randomTemp = Math.floor(Math.random() * (tempRange[1] - tempRange[0] + 1)) + tempRange[0]

        setWeather(randomWeather)
        setTemperature(randomTemp)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Weather Generator</h1>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div>
                            <Label className="text-base">Climate</Label>
                            <RadioGroup defaultValue="temperate" onValueChange={(value) => setClimate(value as Climate)} className="flex flex-col space-y-1 mt-2">
                                {climates.map((c) => (
                                    <div key={c} className="flex items-center space-x-2">
                                        <RadioGroupItem value={c} id={`climate-${c}`} />
                                        <Label htmlFor={`climate-${c}`}>{c.charAt(0).toUpperCase() + c.slice(1)}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        <div>
                            <Label className="text-base">Season</Label>
                            <RadioGroup defaultValue="spring" onValueChange={(value) => setSeason(value as Season)} className="flex flex-col space-y-1 mt-2">
                                {seasons.map((s) => (
                                    <div key={s} className="flex items-center space-x-2">
                                        <RadioGroupItem value={s} id={`season-${s}`} />
                                        <Label htmlFor={`season-${s}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Button onClick={generateWeather} className="w-full mb-6">Generate Weather</Button>

            {weather && temperature !== null && (
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Weather</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {React.createElement(weatherTypes[weather].icon, { size: 48 })}
                            <div>
                                <p className="text-2xl font-bold">{weatherTypes[weather].label}</p>
                                <p className="text-muted-foreground">{temperature}°C</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

