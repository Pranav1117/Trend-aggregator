import { create } from "zustand";

const useStore = create((set) => ({
  searchQuery: "",
  activeFilter: "youtube",
  fetchedData: [],

  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setFetchedData: (data) => set({ fetchedData: data }),
}));

export default useStore;
