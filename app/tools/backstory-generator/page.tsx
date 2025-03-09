import { BackstoryGenerator } from "@/components/backstory-generator";

export default function BackstoryGeneratorPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                Character Backstory Generator
            </h1>
            <p className="mb-4">
                Generate a unique backstory for your character.
            </p>
            <BackstoryGenerator />
        </div>
    );
}
