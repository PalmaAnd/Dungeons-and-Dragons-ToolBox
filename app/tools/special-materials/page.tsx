import { SpecialMaterialsCompendium } from "@/components/special-materials-compendium";
import specialMaterialsData from "@/data/special-materials.json";

export default function SpecialMaterialsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                Special Materials Compendium
            </h1>
            <p className="mb-6">
                Browse special materials for crafting weapons, armor, and other
                items in your D&D campaign. These materials provide unique
                properties and abilities to enhance your equipment.
            </p>
            <SpecialMaterialsCompendium data={specialMaterialsData} />
        </div>
    );
}
