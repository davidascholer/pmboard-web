import React from "react";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/components/dropdown-menu";
import { cn } from "@/ui/lib/utils";

interface SearchFilterDropdownProps {
  filterItems: string[];
  filterItemsChecked: string[];
  onFilterItemsSelected?: (filterItem: string) => void;
  className?: string;
  triggerClassName?: string;
  triggerTitle?: string;
  menuLabel?: string | null;
}

export const SearchFilterDropdown: React.FC<SearchFilterDropdownProps> = ({
  filterItems,
  filterItemsChecked,
  onFilterItemsSelected,
  triggerTitle = "Filter",
  menuLabel,
  className,
  triggerClassName,
}) => {
  // const [currentSelection, setCurrentSelection] = React.useState<string[]>(filterItemsChecked);

  // const handleFilterItemSelected = (filterItem: string) => {
  //   // Remove the filter item if it's already selected
  //   if (currentSelection.some((item) => item === filterItem)) {
  //     setCurrentSelection((prev) => prev.filter((item) => item !== filterItem));
  //     return;
  //   }
  //   // Add the filter item if it's not already selected
  //   if (currentSelection.length > 0) {
  //     setCurrentSelection((prev) => [...prev, filterItem]);
  //     return;
  //   }

  //   if (onFilterItemsSelected) {
  //     onFilterItemsSelected(filterItem);
  //   }
  // };

  return (
    <div className={cn("", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          data-dropdown-toggle="dropdown"
          className={cn(
            "bg-inherit rounded-xl items-center text-xs sm:text-sm font-medium text-center focus-visible:ring-0 border-transparent",
            triggerClassName
          )}
        >
          <p className="focus-visible:ring-0 border-transparent">{triggerTitle}</p>
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-accent text-neutral-500">
          {menuLabel ? (
            <>
              <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          ) : null}
          {filterItems.map((filterItem, key) => (
            <DropdownMenuCheckboxItem
              key={key}
              className="cursor-pointer hover:bg-primary focus:bg-primary"
              checked={
                filterItemsChecked.some((item) => item === filterItem)
              }
              onCheckedChange={() => {
                if (onFilterItemsSelected) {
                  onFilterItemsSelected(filterItem);
                }
              }}
            >
              {filterItem}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
