"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    TreesIcon as Tree,
    Mountain,
    Home,
    Download,
    Upload,
    Dice6,
} from "lucide-react";
import { toPng } from "html-to-image";

type TerrainType =
    | "grass"
    | "water"
    | "mountain"
    | "forest"
    | "road"
    | "tree"
    | "rock"
    | "building";
type TokenType = "player" | "monster" | null;

interface Cell {
    terrain: TerrainType;
    token: TokenType;
}

const terrainColors: Record<TerrainType, string> = {
    grass: "bg-emerald-700",
    water: "bg-blue-800",
    mountain: "bg-stone-600",
    forest: "bg-green-900",
    road: "bg-amber-800",
    tree: "bg-emerald-800",
    rock: "bg-gray-700",
    building: "bg-red-900",
};

const terrainIcons: Partial<Record<TerrainType, React.ReactNode>> = {
    tree: <Tree className="w-6 h-6 text-green-900" />,
    rock: <Mountain className="w-6 h-6 text-gray-700" />,
    building: <Home className="w-6 h-6 text-red-900" />,
};

const tokenColors: Record<NonNullable<TokenType>, string> = {
    player: "bg-sky-500",
    monster: "bg-red-500",
};

export function BattleMapGenerator() {
    const [mapSize, setMapSize] = useState({ width: 10, height: 10 });
    const [selectedTerrain, setSelectedTerrain] =
        useState<TerrainType>("grass");
    const [selectedToken, setSelectedToken] = useState<TokenType>(null);
    const [map, setMap] = useState<Cell[][]>(() =>
        Array(mapSize.height)
            .fill(null)
            .map(() =>
                Array(mapSize.width).fill({ terrain: "grass", token: null })
            )
    );
    const [showCoordinates, setShowCoordinates] = useState(false);
    const mapRef = useRef<HTMLDivElement>(null);

    const handleSizeChange = (dimension: "width" | "height", value: string) => {
        const size = parseInt(value, 10);
        if (size > 0 && size <= 20) {
            setMapSize((prev) => ({ ...prev, [dimension]: size }));
            setMap((prev) => {
                const newMap = [...prev];
                if (dimension === "width") {
                    newMap.forEach((row, i) => {
                        newMap[i] = row.slice(0, size).concat(
                            Array(Math.max(0, size - row.length)).fill({
                                terrain: "grass",
                                token: null,
                            })
                        );
                    });
                } else {
                    if (size > prev.length) {
                        for (let i = prev.length; i < size; i++) {
                            newMap.push(
                                Array(mapSize.width).fill({
                                    terrain: "grass",
                                    token: null,
                                })
                            );
                        }
                    } else {
                        newMap.splice(size);
                    }
                }
                return newMap;
            });
        }
    };

    const handleCellClick = (row: number, col: number) => {
        setMap((prev) => {
            const newMap = [...prev];
            newMap[row] = [...newMap[row]];
            if (selectedToken) {
                newMap[row][col] = {
                    ...newMap[row][col],
                    token: selectedToken,
                };
            } else {
                newMap[row][col] = {
                    ...newMap[row][col],
                    terrain: selectedTerrain,
                };
            }
            return newMap;
        });
    };

    const saveMap = () => {
        const mapData = JSON.stringify({ size: mapSize, cells: map });
        const blob = new Blob([mapData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "battle-map.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const loadMap = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = e.target?.result as string;
                    const { size, cells } = JSON.parse(content);
                    setMapSize(size);
                    setMap(cells);
                } catch (error) {
                    console.error("Error loading map:", error);
                }
            };
            reader.readAsText(file);
        }
    };

    const exportAsImage = useCallback(() => {
        if (mapRef.current === null) {
            return;
        }
        toPng(mapRef.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "battle-map.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [mapRef]);

    const generateRandomMap = () => {
        const newMap = Array(mapSize.height)
            .fill(null)
            .map(() =>
                Array(mapSize.width)
                    .fill(null)
                    .map(() => {
                        const terrainTypes = Object.keys(
                            terrainColors
                        ) as TerrainType[];
                        const randomTerrain =
                            terrainTypes[
                                Math.floor(Math.random() * terrainTypes.length)
                            ];
                        return { terrain: randomTerrain, token: null };
                    })
            );
        setMap(newMap);
    };

    return (
        <div className="space-y-4">
            <div className="flex space-x-4">
                <div>
                    <Label htmlFor="width">Width</Label>
                    <Input
                        id="width"
                        type="number"
                        min="1"
                        max="20"
                        value={mapSize.width}
                        onChange={(e) =>
                            handleSizeChange("width", e.target.value)
                        }
                    />
                </div>
                <div>
                    <Label htmlFor="height">Height</Label>
                    <Input
                        id="height"
                        type="number"
                        min="1"
                        max="20"
                        value={mapSize.height}
                        onChange={(e) =>
                            handleSizeChange("height", e.target.value)
                        }
                    />
                </div>
            </div>
            <div className="flex space-x-4">
                <div>
                    <Label htmlFor="terrain">Terrain</Label>
                    <Select
                        value={selectedTerrain}
                        onValueChange={(value: TerrainType) =>
                            setSelectedTerrain(value)
                        }
                    >
                        <SelectTrigger id="terrain">
                            <SelectValue placeholder="Select terrain" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(terrainColors).map((terrain) => (
                                <SelectItem key={terrain} value={terrain}>
                                    {terrain.charAt(0).toUpperCase() +
                                        terrain.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="token">Token</Label>
                    <Select
                        value={selectedToken || "none"}
                        onValueChange={(value: string | "none") => {
                            setSelectedToken(
                                value === "none" ? null : (value as TokenType)
                            );
                        }}
                    >
                        <SelectTrigger id="token">
                            <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="player">Player</SelectItem>
                            <SelectItem value="monster">Monster</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="showCoordinates"
                    checked={showCoordinates}
                    onChange={(e) => setShowCoordinates(e.target.checked)}
                />
                <Label htmlFor="showCoordinates">Show Coordinates</Label>
            </div>
            <div ref={mapRef} className="border border-gray-300 inline-block">
                {showCoordinates && (
                    <div className="flex">
                        <div className="w-8"></div>
                        {Array.from({ length: mapSize.width }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="w-8 h-8 flex items-center justify-center text-sm font-semibold"
                                >
                                    {String.fromCharCode(65 + index)}
                                </div>
                            )
                        )}
                    </div>
                )}
                {map.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {showCoordinates && (
                            <div className="w-8 h-8 flex items-center justify-center text-sm font-semibold">
                                {rowIndex + 1}
                            </div>
                        )}
                        {row.map((cell, colIndex) => (
                            <button
                                key={colIndex}
                                className={`w-8 h-8 ${
                                    terrainColors[cell.terrain]
                                } border border-gray-400 flex items-center justify-center relative`}
                                onClick={() =>
                                    handleCellClick(rowIndex, colIndex)
                                }
                                aria-label={`${cell.terrain} at row ${
                                    rowIndex + 1
                                }, column ${colIndex + 1}`}
                            >
                                {terrainIcons[cell.terrain]}
                                {cell.token && (
                                    <div
                                        className={`absolute inset-1 rounded-full ${
                                            tokenColors[cell.token]
                                        } border-2 border-white`}
                                    ></div>
                                )}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex space-x-2">
                <Button onClick={saveMap}>
                    <Download className="w-4 h-4 mr-2" />
                    Save Map
                </Button>
                <Button
                    onClick={() => document.getElementById("load-map")?.click()}
                >
                    <Upload className="w-4 h-4 mr-2" />
                    Load Map
                </Button>
                <input
                    id="load-map"
                    type="file"
                    accept=".json"
                    onChange={loadMap}
                    className="hidden"
                />
                <Button onClick={exportAsImage}>
                    <Download className="w-4 h-4 mr-2" />
                    Export as Image
                </Button>
                <Button onClick={generateRandomMap}>
                    <Dice6 className="w-4 h-4 mr-2" />
                    Random Map
                </Button>
            </div>
        </div>
    );
}
