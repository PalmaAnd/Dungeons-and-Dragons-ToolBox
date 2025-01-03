import { BattleMapGenerator } from "@/components/battle-map-generator";
import { TreesIcon as Tree, Mountain, Home } from "lucide-react";

export default function BattleMapGeneratorPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Battle Map Generator</h1>
            <p className="mb-4">
                Create your battle map by selecting terrain types and clicking
                on the grid cells. You can also add player and monster tokens,
                save and load maps, export as an image, and generate random
                maps.
            </p>
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Legend</h2>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-emerald-700 mr-2"></div>
                        <span>Grass</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-800 mr-2"></div>
                        <span>Water</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-stone-600 mr-2"></div>
                        <span>Mountain</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-green-900 mr-2"></div>
                        <span>Forest</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-amber-800 mr-2"></div>
                        <span>Road</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-emerald-800 flex items-center justify-center mr-2">
                            <Tree className="w-4 h-4 text-emerald-950" />
                        </div>
                        <span>Tree</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-gray-700 flex items-center justify-center mr-2">
                            <Mountain className="w-4 h-4 text-gray-800" />
                        </div>
                        <span>Rock</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-red-900 flex items-center justify-center mr-2">
                            <Home className="w-4 h-4 text-red-950" />
                        </div>
                        <span>Building</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-sky-500 rounded-full mr-2"></div>
                        <span>Player Token</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-red-500 rounded-full mr-2"></div>
                        <span>Monster Token</span>
                    </div>
                </div>
            </div>
            <BattleMapGenerator />
        </div>
    );
}
