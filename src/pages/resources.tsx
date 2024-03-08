// resources.tsx

import React from "react";

const Resources: React.FC = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-4 text-3xl font-bold">Resources</h1>
			<ul className="ml-6 list-disc">
				<li>
					<a
						href="https://roll20.net/"
						className="text-blue-500 hover:underline"
					>
						Roll20
					</a>
				</li>
				<li>
					<a
						href="https://www.worldanvil.com/"
						className="text-blue-500 hover:underline"
					>
						World Anvil
					</a>
				</li>
				<li>
					<a
						href="https://eigengrausgenerator.com/"
						className="text-blue-500 hover:underline"
					>
						Eigengrau`s Generator
					</a>
				</li>
				<li>
					<a
						href="https://www.fantasytowngenerator.com/"
						className="text-blue-500 hover:underline"
					>
						Fantasy Town Generator
					</a>
				</li>
				<li>
					<a
						href="https://watabou.github.io/"
						className="text-blue-500 hover:underline"
					>
						Watabou
					</a>
				</li>
				<li>
					<a
						href="https://azgaar.github.io/Fantasy-Map-Generator/"
						className="text-blue-500 hover:underline"
					>
						Fantasy Map Generator
					</a>
				</li>
				<li>
					<a
						href="https://watabou.github.io/village-generator"
						className="text-blue-500 hover:underline"
					>
						Village Generator
					</a>
				</li>
				<li>
					<a
						href="https://apps.quanticfoundry.com/guildnames/"
						className="text-blue-500 hover:underline"
					>
						Guild Name Generator
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Resources;
