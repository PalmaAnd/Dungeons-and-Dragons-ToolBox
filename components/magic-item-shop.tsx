"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type MagicItem = {
    id: number;
    name: string;
    type: string;
    rarity: string;
    price: number;
    description: string;
};

const magicItems: MagicItem[] = [
    {
        id: 1,
        name: "Potion of Healing",
        type: "Potion",
        rarity: "Common",
        price: 50,
        description: "Restores 2d4+2 hit points when consumed.",
    },
    {
        id: 2,
        name: "Sword of Sharpness",
        type: "Weapon",
        rarity: "Very Rare",
        price: 5000,
        description: "A magic sword that deals extra slashing damage.",
    },
    {
        id: 3,
        name: "Cloak of Elvenkind",
        type: "Wondrous Item",
        rarity: "Uncommon",
        price: 500,
        description: "Grants advantage on Stealth checks.",
    },
    {
        id: 4,
        name: "Wand of Magic Missiles",
        type: "Wand",
        rarity: "Uncommon",
        price: 300,
        description: "Casts Magic Missile without using a spell slot.",
    },
    {
        id: 5,
        name: "Bag of Holding",
        type: "Wondrous Item",
        rarity: "Uncommon",
        price: 400,
        description:
            "A bag that can hold up to 500 pounds of items in an extradimensional space.",
    },
];

export function MagicItemShop() {
    const [filter, setFilter] = useState("");
    const [cart, setCart] = useState<MagicItem[]>([]);

    const filteredItems = magicItems.filter(
        (item) =>
            item.name.toLowerCase().includes(filter.toLowerCase()) ||
            item.type.toLowerCase().includes(filter.toLowerCase()) ||
            item.rarity.toLowerCase().includes(filter.toLowerCase())
    );

    const addToCart = (item: MagicItem) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (itemId: number) => {
        setCart(cart.filter((item) => item.id !== itemId));
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="space-y-6">
            <Input
                placeholder="Search magic items..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="max-w-sm"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                            <CardDescription>
                                {item.type} - {item.rarity}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                {item.description}
                            </p>
                            <p className="mt-2 font-semibold">
                                Price: {item.price} gp
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => addToCart(item)}>
                                Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Shopping Cart</CardTitle>
                </CardHeader>
                <CardContent>
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center mb-2"
                        >
                            <span>{item.name}</span>
                            <div>
                                <span className="mr-4">{item.price} gp</span>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 text-right font-semibold">
                        Total: {totalPrice} gp
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Checkout</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
