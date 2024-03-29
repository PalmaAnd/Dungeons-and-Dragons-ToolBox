import React, { useState } from "react";

interface DiceProps {
	sides: number;
}

const Dice: React.FC<DiceProps> = ({ sides }) => {
	const [result, setResult] = useState<number | null>(null);

	const generateResult = () => {
		setResult(null);
		const newResult = Math.floor(Math.random() * sides) + 1;
		setResult(newResult);
	};

	return (
		<button
			className={`flex h-32 w-48 flex-col items-center justify-center rounded-lg bg-gray-600 p-4 ${result === null ? "rolling" : ""}`}
			onClick={generateResult}
			aria-label={`Roll D${sides}. ${result !== null ? `Last Result: ${result}` : "Click to roll the dice"}`}
			onKeyDown={(e) => e.key === "Enter" && generateResult()}
			tabIndex={0}
		>
			<h3 className="mb-2">{`D${sides}`}</h3>
			<div className="text-xl">Result: {result}</div>
		</button>
	);
};

export default Dice;
