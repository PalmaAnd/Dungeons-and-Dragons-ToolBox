import { MagicItemShop } from "@/components/magic-item-shop";

export default function MagicItemShopPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Magic Item Shop</h1>
            <p className="mb-4">
                Browse and purchase magical items for your adventures.
            </p>
            <MagicItemShop />
        </div>
    );
}
