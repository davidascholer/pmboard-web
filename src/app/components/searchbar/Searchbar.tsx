import React from "react";
import { SearchCategoryDropdown } from "./SearchCategoryDropdown";
import { SearchFilterDropdown } from "./SearchFilterDropdown";
import { InputAlt } from "../Input";
import { cn } from "@/ui/lib/utils";
import { ArrowLeft, Settings2 } from "lucide-react";
// import { Button } from "@/ui/components/button";

interface SearchbarProps {
  //   placeholder?: string;
  //   onSearch: (query: string) => void;
  menuItems?: string[];
  filterItems?: string[];
  filterItemsChecked?: string[];
  initialValue?: string;
  onFilterItemsSelected?: (filterItem: string) => void;
  onMenuItemSelected?: (menuItem: string) => void;
  onSearchInputChanged?: (searchInpu: string) => void;
  menuItemSelected?: string;
  className?: string;
  initialMenuSelection?: string;
  menuLabel?: string | null;
}

const Searchbar: React.FC<SearchbarProps> = ({
  menuItems,
  filterItems,
  filterItemsChecked,
  menuItemSelected,
  className,
  initialValue,
  initialMenuSelection,
  menuLabel,
  onMenuItemSelected = (menuItem: string) =>
    console.warn("menuItemSelected not implemented", menuItem),
  onFilterItemsSelected = (filterItem: string) =>
    console.warn("filterItem selected from Searchbar not implemented", filterItem),
  onSearchInputChanged = (menuInput: string) =>
    console.warn("menu input text changed in Searchbar not implemented", menuInput),
}) => {
  // For search input changed
  const [, startTextChangeTransition] = React.useTransition();
  const [searchInput, setSearchInputValue] = React.useState(initialValue || "");
  const [searchView, setSearchView] = React.useState(true);

  // For search input changed
  // for search input value entered (independent of searchInput state)
  const [searchInputHistory, formAction, formActionPending] =
    React.useActionState(
      async (previousState: FormDataEntryValue | null, formData: FormData) => {
        const newInput = formData.get("searchInput");
        addOptimisticHistoryItem(newInput + "");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Reset the form data for controlled inputs
        setSearchInputValue("");
        return previousState
          ? `${previousState}` + " : " + `${newInput}`
          : newInput;
      },
      ""
    );

  // Use optimistic updates for history items
  const [, addOptimisticHistoryItem] = React.useOptimistic(
    `${searchInputHistory}`,
    (currentHistoryItems: string, newHistoryItem: string) => {
      return currentHistoryItems + " | " + newHistoryItem;
    }
  );

  const handleSearchTextChanged = (searchText: string) => {
    startTextChangeTransition(() => {
      setSearchInputValue(searchText);
      if (onSearchInputChanged) onSearchInputChanged(searchText);
    });
  };

  // React.useEffect(() => {
  //   console.warn("Searchbar allHistoryItems no function applied", searchInputHistory);
  // }, [searchInputHistory]);

  return (
    <form action={formAction} className={cn("flex-1 mx-auto", className)}>
      <div className="flex flex-row gap-1 w-full items-center justify-start px-2">
        <ArrowLeft
          size={30}
          className={
            "mx-4 bg-transparent cursor-pointer hover-highlight rounded-xl text-sidebar-primary-foreground " +
            (searchView ? "hidden" : "block")
          }
          onClick={() => setSearchView(true)}
        />
        {menuItems ? (
          <div
            id="menu-container"
            className={searchView ? "hidden min-[500px]:flex" : "flex"}
          >
            <SearchCategoryDropdown
              categoryItems={menuItems}
              menuItemSelected={menuItemSelected}
              categoryItemSelected={onMenuItemSelected}
              initialSelection={initialMenuSelection}
              menuLabel={menuLabel}
              className="border-none h-10 align-middle shadow-sm px-2 font-small focus-visible:ring-0 hover-highlight rounded-xl text-neutral-500 bg-sidebar-accent"
            />
          </div>
        ) : null}
        <div
          id="search-container"
          className={
            "flex-1 h-10 flex align-middle justify-center items-center px-2 text-neutral-500 " +
            (searchView ? "block" : "hidden")
          }
        >
          <InputAlt
            type="search"
            name="searchInput"
            disabled={formActionPending}
            searchInputValue={searchInput}
            onInputChanged={handleSearchTextChanged}
            placeholder="Search"
            className={
              "bg-sidebar-accent border-none h-full px-4 font-medium border-transparent focus-visible:ring-0 hover-highlight w-full " +
              (!menuItems ? " rounded-xl" : "")
            }
          />
        </div>

        {filterItems ? (
          <div
            id="filter-container"
            className={searchView ? "hidden min-[500px]:block flex01" : "block"}
          >
            <SearchFilterDropdown
              filterItems={filterItems}
              onFilterItemsSelected={onFilterItemsSelected}
              triggerClassName="hover-highlight flex"
              className={
                "bg-sidebar-accent border-none h-10 flex align-middle shadow-sm px-2 font-medium focus-visible:ring-0 hover-highlight rounded-xl text-neutral-500"
              }
              filterItemsChecked={filterItemsChecked || []}
            />
          </div>
        ) : null}
        <Settings2
          size={30}
          className={
            "block min-[500px]:hidden mx-4 bg-transparent cursor-pointer hover-highlight rounded-xl text-sidebar-primary-foreground " +
            (searchView ? "block" : " hidden")
          }
          onClick={() => setSearchView(false)}
        />
      </div>
      <div
        id="container"
        className="flex justify-between flex-row gap-1 w-full align-middle items-center px-2"
      ></div>
    </form>
  );
};

export default Searchbar;
