import React from "react";
import Dice from "./components/Dice";

const Players = () => {
	return (
		<main className="flex min-h-screen flex-col items-center">
			<div className="container flex items-start gap-12 px-4 py-16">
				<section>
					<h3 className="py-4 text-center text-2xl font-bold">
						Dice rolls
					</h3>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
						<Dice sides={4} />
						<Dice sides={6} />
						<Dice sides={8} />
						<Dice sides={12} />
						<Dice sides={20} />
						<Dice sides={100} />
					</div>
				</section>
			</div>
		</main>
	);
};

export default Players;
