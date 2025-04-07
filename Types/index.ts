export interface SvgIconsProps {
  height?: number;
  width?: number;
  onClick?: (e: React.MouseEvent) => void;
}

export type FilterItem = {
  id: string;
  label: string;
};

export type FilterSection = {
  title: string;
  items: FilterItem[];
};

export type SidebarProps = {
  isSidebarOpen: boolean;
  handleToggleSidebar: () => void;
  activeFilters?: string;
  handleFilterClick?: () => void;
};

export interface Item {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  publishedAt?: string;
  channel?: string;
  source?: string;
  platform?: string;
}

export interface StoreState {
  searchQuery: string;
  activeFilter: string;
  fetchedData: Item[];
  loading: boolean;

  setSearchQuery: (query: string) => void;
  setActiveFilter: (filter: string) => void;
  setFetchedData: (data: Item[]) => void;
  setLoading: (data: boolean) => void;
}
