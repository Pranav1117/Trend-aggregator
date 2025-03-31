import { useState } from "react";
import LeftArrowicon from "./Icons/LeftArrowicon";
import RightArrowIcon from "./Icons/RightArrowIcon";

const Sidebar = ({ isSidebarOpen, handleToggleSidebar }) => {
  const filters = {
    platforms: ["YouTube", "Reddit", "Twitter/X"],
    sentiments: ["sentiment1", "sentiment2"],
    engagement: ["Most Shared", "Most Liked"],
  };

  const [activePlatform, setActivePlatform] = useState(filters.platforms[0]);

  return (
    <aside
      className={`w-[20%] shadow-lg p-4 space-y-4 fixed flex flex-col top-18 left-0 h-full transition-transform transform border-r border-neutral-700
       ${isSidebarOpen ? "translate-x-0" : "-translate-x-[92%]"}`}
    >
      <button
        onClick={handleToggleSidebar}
        className="absolute -right-5 -top-[-40%] cursor-pointer p-2 bg-neutral-700 border-black rounded-full border "
      >
        {isSidebarOpen ? <LeftArrowicon /> : <RightArrowIcon />}
      </button>

      <div className="border-b pb-2 border-neutral-800">
        <h2 className="text-neutral-500">Filter by Platform</h2>
        <ul className="space-y-2 mt-1">
          {filters.platforms.map((platform, index) => (
            <li
              key={platform}
              className={`p-2 ${
                activePlatform === platform ? "bg-neutral-700" : ""
              } cursor-pointer hover:bg-neutral-800 rounded`}
              onClick={(e) => setActivePlatform(platform)}
            >
              {platform}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-b pb-2 border-neutral-800">
        <h2 className="text-neutral-500">Filter by Sentiments</h2>
        <ul className="space-y-2 mt-1">
          {filters.sentiments.map((sentiments, index) => (
            <li
              key={sentiments}
              className={`p-2 ${
                activePlatform === sentiments ? "bg-neutral-700" : ""
              } cursor-pointer hover:bg-neutral-800 rounded`}
              onClick={() => setActivePlatform(sentiments)}
            >
              {sentiments}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-b pb-2 border-neutral-800">
        <h2 className="text-neutral-500">Filter by Engagement</h2>
        <ul className="space-y-2 mt-1">
          {filters.engagement.map((value, index) => (
            <li
              key={value}
              className={`p-2 ${
                activePlatform === value ? "bg-neutral-700" : ""
              } cursor-pointer hover:bg-neutral-800 rounded`}
              onClick={() => setActivePlatform(value)}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
