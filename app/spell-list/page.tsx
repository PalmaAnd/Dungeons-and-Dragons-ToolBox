import { SpellList } from "@/components/spell-list";
import { createClient } from "@/utils/supabase/client";

export const revalidate = 3600; // revalidate every hour
const supabase = createClient();

async function getSpells() {
    const { data, error } = await supabase.from("spells").select("*");

    if (error) {
        console.error("Error fetching spells:", error);
        return [];
    }

    return data;
}

async function getUniqueClasses() {
    const { data, error } = await supabase.from("spells").select("classes");

    if (error) {
        console.error("Error fetching classes:", error);
        return [];
    }

    const allClasses = data.flatMap((spell) => spell.classes.split(", "));
    return Array.from(new Set(allClasses)).sort();
}

export default async function SpellListPage() {
    const [spells, classes] = await Promise.all([
        getSpells(),
        getUniqueClasses(),
    ]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Spell List</h1>
            <SpellList initialSpells={spells} classes={classes} />
        </div>
    );
}
