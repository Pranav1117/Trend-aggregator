import LeftArrowIcon from "../Icons/LeftArrowicon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import { SidebarProps } from "../../Types";
import { FILTER_SECTION } from "../../Constant";
import { FilterSectionComponent } from "./FilterSection";
import useStore from "@/app/store/useStore";

const Sidebar = ({ isSidebarOpen, handleToggleSidebar }: SidebarProps) => {
  const activeFilter = useStore((state) => state.activeFilter);
  const handleFilterClick = useStore((state) => state.setActiveFilter);

  return (
    <aside
      className={`bg-neutral-900 z-9 w-[100%] md:w-[20%] shadow-lg p-4 space-y-4 fixed flex flex-col top-18 left-0 h-full transition-transform transform border-r border-neutral-700
       ${isSidebarOpen ? "translate-x-0" : "-translate-x-[98%] md:-translate-x-[92%]"}`}
      aria-hidden={!isSidebarOpen}
    >
      <button
        onClick={handleToggleSidebar}
        className="absolute -right-5 -top-[-40%] cursor-pointer p-2 bg-neutral-700 border-black rounded-full border"
        aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isSidebarOpen ? <LeftArrowIcon /> : <RightArrowIcon />}
      </button>

      {FILTER_SECTION.map((section) => (
        <FilterSectionComponent
          key={section.title}
          title={section.title}
          items={section.items}
          activeItem={activeFilter}
          onItemClick={(itemId) => handleFilterClick(itemId)}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
