import { useState } from "react";
import LeftArrowIcon from "../Icons/LeftArrowicon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import { SidebarProps } from "../../Types";
import { filterSections } from "../../Constant";
import { FilterSectionComponent } from "./FilterSection";

const Sidebar = ({ isSidebarOpen, handleToggleSidebar }: SidebarProps) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    platform: "youtube",
    sentiment: "sentiment1",
    engagement: "most_shared",
  });

  const handleFilterClick = (sectionId: string, itemId: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [sectionId]: itemId,
    }));
  };

  return (
    <aside
      className={`bg-neutral-900 z-9 w-[100%] md:w-[20%] shadow-lg p-4 space-y-4 fixed flex flex-col top-18 left-0 h-full transition-transform transform border-r border-neutral-700
       ${isSidebarOpen ? "translate-x-0" : "-translate-x-[92%]"}`}
      aria-hidden={!isSidebarOpen}
    >
      <button
        onClick={handleToggleSidebar}
        className="absolute -right-5 -top-[-40%] cursor-pointer p-2 bg-neutral-700 border-black rounded-full border"
        aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isSidebarOpen ? <LeftArrowIcon /> : <RightArrowIcon />}
      </button>

      {filterSections.map((section) => (
        <FilterSectionComponent
          key={section.title}
          title={section.title}
          items={section.items}
          activeItem={activeFilters[section.title.toLowerCase().split(" ")[1]]}
          onItemClick={(itemId) =>
            handleFilterClick(section.title.toLowerCase().split(" ")[1], itemId)
          }
        />
      ))}
    </aside>
  );
};

export default Sidebar;
