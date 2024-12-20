import { DiceRoller } from "@/components/dice-roller";

export default function DiceRollerPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Dice Roller</h1>
            <p className="mb-4">
                Roll virtual dice for your D&D games. You can roll standard dice
                or enter custom roll formulas.
            </p>
            <DiceRoller />
        </div>
    );
}
