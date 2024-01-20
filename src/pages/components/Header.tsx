// Header.tsx

import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="page-header">
      <Link href="/">
        <button className="">WORK IN PRORESS</button>
      </Link>
    </header>
  );
};

export default Header;
