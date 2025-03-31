import React from "react";
import { SearchBar } from "./Searchbar";
import User from "./Icons/User";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  weight: ["400", "700"], // Choose weights: 400 (regular), 500, 600, 700 (bold)
  subsets: ["latin"], // Specify character subsets
  display: "swap", // Font-display strategy (optional, improves performance)
});

const Navbar = () => {
  return (
    <nav className="w-full p-4 shadow-lg fixed top-0 left-0 z-10 border-b border-neutral-700">
      <div className="flex justify-between items-center">
        <h1
          className={`text-4xl font-extrabold cursor-pointer ${dancingScript.className}`}
        >
          Trend's
        </h1>

        {/* Searchbar */}
        <div className="w-[40%] h-10">
          <SearchBar />
        </div>

        {/* profile icons */}
        <div className=" bg-red-100">
          <User height={20} width={20} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
