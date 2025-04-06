import { create } from "zustand";
import { StoreState } from "../../../Types";

const useStore = create<StoreState>((set) => ({
  searchQuery: "",
  activeFilter: "youtube",
  fetchedData: [],

  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setFetchedData: (data) => set({ fetchedData: data }),
}));

export default useStore;
