import React from "react";
import NPCGenerator from "./generators/NPCGenerator";
import HeroGenerator from "./generators/HeroGenerator";

const Players = () => {
	return (
		<main className="flex min-h-screen flex-col items-center">
			<div className="container flex items-start gap-12 px-4 py-16">
				<section className="w-1/4 backdrop-brightness-75">
					<h3 className="py-4 text-center text-2xl font-bold">NPC Generator</h3>
					<NPCGenerator></NPCGenerator>
				</section>
				<section className="w-1/4 backdrop-brightness-75">
					<h3 className="py-4 text-center text-2xl font-bold">
						Hero Generator
					</h3>
					<HeroGenerator></HeroGenerator>
				</section>
			</div>
		</main>
	);
};

export default Players;
