import { create } from "zustand";
import { StoreState } from "../../../Types";

const useStore = create<StoreState>((set) => ({
  searchQuery: "",
  activeFilter: "youtube",
  fetchedData: [],
  loading: true,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setFetchedData: (data) => set({ fetchedData: data }),
  setLoading: (boolean) => set({ loading: boolean }),
}));

export default useStore;
