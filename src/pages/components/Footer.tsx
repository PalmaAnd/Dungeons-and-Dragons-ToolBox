// Footer.tsx

import Link from "next/link";

const Footer = () => {
	return (
		<footer className="fixed bottom-0 flex w-full items-center justify-between bg-gray-800 px-8 py-4">
			<div className="flex flex-row justify-center gap-2 ">
				<Link href="/impressum">Impressum</Link>
				<Link href="https://github.com/PalmaAnd/Dungeons-and-Dragons-ToolBox">
					GitHub
				</Link>
				<Link href="/about">About</Link>
			</div>
			<div className="">
				Palma André © {new Date().getFullYear()} Dungeons and Dragons Toolbox
			</div>
		</footer>
	);
};

export default Footer;
