import React from "react";

const Impressum: React.FC = () => {
	return (
		<div className="mx-auto px-4 py-8 ">
			<h1 className="mb-4 text-3xl font-bold">Impressum</h1>
			<p className="mb-4">
				Dies ist eine kostenlose Hobby-Website, die Werkzeuge für Dungeons &
				Dragons anbietet.
			</p>
			<p className="mb-4">
				Betreiber dieser Website:
				<br />
				Andrè Palma
				<br />
			</p>
			<p className="mb-4">
				Diese Website ist Teil eines persönlichen Projekts und bietet keine
				kommerziellen Dienstleistungen an.
			</p>
		</div>
	);
};

export default Impressum;
