"use client";

import axios from "axios";
import SearchIcon from "./Icons/SearchIcon";
import useStore from "@/app/store/useStore";

export const SearchBar = () => {
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);

  const fetchData = async (query?: string) => {
    const res = await axios(
      `http://192.168.0.103:3000/api/search?q=${query ?? "trending"}`
    );
    console.log(res);
  };

  const onSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(searchQuery);
    fetchData(searchQuery);
  };

  return (
    <div className="flex items-center bg-neutral-800 shadow-md px-4 rounded-full">
      <input
        type="text"
        placeholder="Search trends..."
        className="flex-1 p-2 outline-none placeholder-gray-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SearchIcon height={20} width={20} onClick={(e) => onSearch(e)} />
    </div>
  );
};
