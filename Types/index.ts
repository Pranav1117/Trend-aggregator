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
