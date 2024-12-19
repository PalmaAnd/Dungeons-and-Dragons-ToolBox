import { CharacterCreator } from "@/components/character-creator";

export default function CharacterCreatorPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Character Creator</h1>
            <p className="mb-4">
                Create your D&D character by filling out the form below. Choose
                your characters name, class, race, alignment, and set their
                ability scores.
            </p>
            <CharacterCreator />
        </div>
    );
}
