// Header.tsx

import React from "react";
import Link from "next/link";
import {
	HomeIcon,
	InformationCircleIcon,
	PencilSquareIcon,
	UserIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
	return (
		<header className="flex h-fit  w-full flex-row items-center gap-12 border-b px-8 py-4 ">
			<Link href="/" className="flex flex-col items-center">
				<HomeIcon className="h-6 w-6 sm:h-10 sm:w-10" />
				Home
			</Link>
			<Link href="/players" className="flex flex-col items-center">
				<UserIcon className="h-6 w-6 sm:h-10 sm:w-10" /> Player
			</Link>
			<Link href="/dungeon_master" className="flex flex-col items-center">
				<PencilSquareIcon className="h-6 w-6 sm:h-10 sm:w-10" /> Dungeon Master
			</Link>
			<Link href="/resources" className="flex flex-col items-center">
				<InformationCircleIcon className="h-6 w-6 sm:h-10 sm:w-10" />
				Other resources
			</Link>
		</header>
	);
};

export default Header;
