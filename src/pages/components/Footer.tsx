// Footer.tsx

import Link from "next/link";

const Footer = () => {
	return (
		<footer className="flex items-center justify-between px-8 py-4 fixed bottom-0 w-full bg-gray-800">
			<div className="flex flex-row justify-center gap-2 text-white">
				<Link href="/impressum">Impressum</Link>
				<Link href="https://github.com/PalmaAnd/Dungeons-and-Dragons-ToolBox">GitHub</Link>
				<Link href="/about">About</Link>
			</div>
			<div className="text-white">
				Palma André © {new Date().getFullYear()} Dungeons and Dragons Toolbox
			</div>
		</footer>
	);
};

export default Footer;
