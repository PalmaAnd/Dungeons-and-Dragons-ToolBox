import { ShopGenerator } from "@/components/shop-generator";
import itemsData from "@/data/items.json";

export default function ShopGeneratorPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Magic Shop Generator</h1>
            <p className="mb-6">
                Generate a custom magic shop with different qualities and
                inventories. Choose the shop status to determine the quality and
                rarity of available items.
            </p>
            <ShopGenerator itemsData={itemsData} />
        </div>
    );
}
