import { FilterItem } from "../../Types";

export const FilterSectionComponent = ({
    title,
    items,
    activeItem,
    onItemClick,
  }: {
    title: string;
    items: FilterItem[];
    activeItem?: string;
    onItemClick: (id: string) => void;
  }) => (
    <div className="border-b pb-2 border-neutral-800">
      <h2 className="text-neutral-500">{title}</h2>
      <ul className="space-y-2 mt-1">
        {items.map((item) => (
          <li
            key={item.id}
            className={`p-2 ${
              activeItem === item.id ? "bg-neutral-700" : ""
            } cursor-pointer hover:bg-neutral-800 rounded`}
            onClick={() => onItemClick(item.id)}
            aria-selected={activeItem === item.id}
            role="option"
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
  