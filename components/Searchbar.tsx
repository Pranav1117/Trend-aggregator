"use client";

import { useState } from "react";
import SearchIcon from "./Icons/SearchIcon";

// @ts-ignore
export const SearchBar = () => {
  const [userInput, setUserInput] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    console.log(userInput);
  };

  return (
    <div className="flex items-center bg-neutral-800 shadow-md px-4 rounded-full">
      <input
        type="text"
        placeholder="Search trends..."
        className="flex-1 p-2 outline-none placeholder-gray-300"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <SearchIcon height={20} width={20} onClick={(e) => onSearch(e)} />
    </div>
  );
};
