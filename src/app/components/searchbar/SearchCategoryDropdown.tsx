import React from "react";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/components/dropdown-menu";


import { cn } from "@/ui/lib/utils";

interface SearchCategoryDropdownProps {
  categoryItems: string[];
  categoryItemSelected: (filterItem: string) => void;
  className?: string;
  menuItemSelected?: string;
  initialSelection?: string;
  menuLabel?: string | null;
}

export const SearchCategoryDropdown: React.FC<SearchCategoryDropdownProps> = ({
  categoryItems,
  categoryItemSelected,
  initialSelection = "All",
  menuItemSelected,
  menuLabel,
  className,
}) => {
  const [categoryTitle, setCategoryTitle] =
    React.useState<string>(menuItemSelected ? menuItemSelected : initialSelection);

  const handleCategoryItemSelected = (filterItem: string) => {
    setCategoryTitle(filterItem);
    categoryItemSelected(filterItem);
  };

  return (
    <DropdownMenu > 
      <DropdownMenuTrigger
        data-dropdown-toggle="dropdown"
        className={cn(
          "bg-sidebar-primary-foreground rounded-lg p-2 shrink-0 inline-flex border-none items-center text-sm font-medium text-center outline-none focus-visible:ring-0",
          className,
        )}
      >
        <span className="mr-1 text-xs sm:text-sm">{categoryTitle}</span>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-accent text-neutral-500">
        {menuLabel ? (
          <>
            <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        ) : null}
        {categoryTitle !== initialSelection && (
          <DropdownMenuItem
            className="cursor-pointer hover:bg-primary focus:bg-primary flex-1"
            onClick={() => handleCategoryItemSelected(initialSelection)}
          >
            {initialSelection}
          </DropdownMenuItem>
        )}

        {categoryItems.map((menuItem, key) => (
          <React.Fragment key={key}>
            {categoryTitle !== menuItem && (
              <DropdownMenuItem
                key={key}
                className="cursor-pointer hover:bg-primary focus:bg-primary"
                onClick={() => handleCategoryItemSelected(menuItem)}
              >
                {menuItem}
              </DropdownMenuItem>
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
