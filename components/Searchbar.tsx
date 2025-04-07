"use client";

import axios from "axios";
import SearchIcon from "./Icons/SearchIcon";
import useStore from "@/app/store/useStore";

export const SearchBar = () => {
  const searchQuery = useStore((state) => state.searchQuery);
  const loading = useStore((state) => state.loading);

  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const setLoading = useStore((state) => state.setLoading);

  const fetchData = async (query?: string) => {
    setLoading(true);
    try {
      const res = await axios(
        `http://192.168.0.104:3000/api/search?q=${query ?? "trending"}`
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (e: React.MouseEvent) => {
    e.preventDefault();
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
