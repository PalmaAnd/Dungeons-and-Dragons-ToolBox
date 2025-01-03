import { SpellList } from "@/components/spell-list";
import { createClient } from "@/utils/supabase/client";

export const revalidate = 3600; // revalidate every hour

async function getSpells() {
    const supabase = createClient();
    const { data: spells, error } = await supabase.from("spells").select("*");

    if (error) {
        console.error("Error fetching spells:", error);
        return [];
    }
    return spells;
}

export default async function SpellListPage() {
    const spells = await getSpells();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Spell List</h1>
            <SpellList initialSpells={spells} />
        </div>
    );
}
