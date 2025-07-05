
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  // useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
  useLocation,
} from "react-router";

import PageContainer from "../components/PageContainer";
import { cn } from "@/ui/lib/utils";
import AppPagination from "../components/AppPagination";
import { AppToolbar } from "../components/app-toolbar/AppToolbar";
import Searchbar from "../components/searchbar/Searchbar";
import { useGetAPIListAllQuery } from "@/state/services/apiSlice";
import {
  ITEMS_PER_PAGE,
  // API_ROOT_URL,
  // PRIMARY_RESOURCE_TYPE,
  // MENU_ITEMS,
  // FILTER_ITEMS,
} from "../api/controller/dynamic/constants";
import {
  ApiListItemType,
  ApiListResponseType,
  // FilterType,
  // MenuType,
} from "../api/controller/static/types";
import {
  // externalGenerateFilterSearchUrl,
  externalGetPaginatedDataFromAllData,
  filterAllDataBySearchString,
  // getFilterItems,
  // getMenuItems,
} from "../api/controller/dynamic/apiDynamic";
import { ExternalApiListResponseType } from "../api/controller/dynamic/types";

export const QueryListItem = ({
  className,
  item,
}: {
  className?: string;
  item: ApiListItemType;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        className,
        "w-[200px] cursor-pointer flex flex-col justify-center items-center gap-2 mt-10"
      )}
      onClick={() => {
        // Navigate to a detailed page of a selected item
        navigate("/" + String(item.name));
      }}
    >
      <h1 className="w-full text-center font-bold">{item.name}</h1>
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="object-cover max-w-[180px] max-h-[180px]"
        />
      ) : null}
      {/* {item.description && item.description !== "" ? (
        <p className="text-center">{item.description}</p>
      ) : null} */}
    </div>
  );
};

const QueryList: React.FC = () => {
  const [, startTransition] = useTransition();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  // The list data
  const [paginatedData, setPaginatedData] = useState<ApiListResponseType>();
  const [apiData, setApiData] = useState<ExternalApiListResponseType>();
  // Api response from primary resource(subfolder)
  // const [apiUrlWithParam, setApiUrlWithParams] = useState<string>();
  const { data, error, isLoading } = useGetAPIListAllQuery({});
  // const { data, error, isLoading } = useGetListQuery(apiUrlWithParam || "", {
  //   refetchOnMountOrArgChange: true,
  //   skip: apiUrlWithParam === undefined || apiUrlWithParam === "",
  // });
  // The url params
  const pageParamString = searchParams.get("page") || "1";
  // Reference to clear batch fetch calls
  const timeoutID = useRef<NodeJS.Timeout | undefined>(undefined);
  // UI reference
  const [listLoading, setListLoading] = useState<boolean>(false);
  // Filter and menu items
  // const [filterItems, setFilterItems] = useState<FilterType[]>(FILTER_ITEMS); // Default all filter items selected
  // const [menuItem, setMenuItem] = useState<MenuType | null>(null);
  // const filterItemStringList = useMemo(() => getFilterItems(), []);
  // const menuItemsStringList = useMemo(() => getMenuItems(), []);
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const updateUrlWithParams = useCallback(async () => {
    if (!data) return;
    const filteredResults = filterAllDataBySearchString(searchInputValue, data);
    setApiData(filteredResults);
    // const filterItemsList = filterItems.map((item) => ({
    // // Search only works if there is a search param
    // if (!searchParam || searchParam === "") {
    //   return;
    // }
    // const url = externalGenerateFilterSearchUrl({
    //   base: API_ROOT_URL,
    //   resource: PRIMARY_RESOURCE_TYPE,
    //   currentPage: parseInt(pageParamString),
    //   listingsPerPage: ITEMS_PER_PAGE,
    //   // filters: [...filterItems, ...(menuItem ? [menuItem] : [])],
    //   search: searchParam,
    // });
    // setApiUrlWithParams("/pokemon");
    // const filterItemsList = filterItems.map((item) => ({
    //   [item.filterName]: item.filterValue,
    // }));

    // const menuItemObject: MenuType | undefined =
    //   MENU_ITEMS.find(
    //     (item) =>
    //       item.filterDisplayName === menuItem?.filterDisplayName ||
    //       item.filterName === menuItem?.filterName
    //   ) || undefined;
    setSearchParams(
      createSearchParams({
        page: searchInputValue !== "" ? "1" : pageParamString,
        search: searchInputValue,
        // ...Object.assign({}, ...filterItemsList),
        // ...(menuItemObject
        //   ? { [menuItemObject.filterName]: menuItemObject.filterValue }
        //   : {}),
      }),
      { replace: true }
    );
  }, [data, pageParamString, searchInputValue, setSearchParams]);
  // }, [filterItems, menuItem, pageParamString, searchInputValue, setSearchParams]);

  // Update the paginated data from the apiData state
  const updatePaginatedData = useCallback(async () => {
    if (!apiData) return;
    setListLoading(true);
    startTransition(async function () {
      const newPaginatedData: ApiListResponseType =
        await externalGetPaginatedDataFromAllData(
          apiData,
          parseInt(pageParamString),
          ITEMS_PER_PAGE
        );
      startTransition(() => {
        setListLoading(false);
        setPaginatedData(newPaginatedData);
      });
    });
  }, [apiData, pageParamString]);

  // Set new data when the search input changes
  // startTransition no working as expected so going old school
  const handleTextChanged = (searchInput: string) => {
    if (searchInput === searchInputValue) return;

    if (typeof timeoutID.current === "number") {
      clearTimeout(timeoutID.current);
    }
    timeoutID.current = setTimeout(async () => {
      setSearchInputValue(searchInput);
      timeoutID.current = undefined;
    }, 1500);
  };

  // const handleFilterItemsSelected = (item: string) => {
  //   // Find the filter item in the list
  //   const filteredItem = FILTER_ITEMS.find(
  //     (filterItem) =>
  //       filterItem.filterDisplayName === item || filterItem.filterName === item
  //   );
  //   if (!filteredItem) return;
  //   // Check if the filter item is already selected
  //   const isSelected = filterItems.some(
  //     (filter) => filter.filterName === filteredItem.filterName
  //   );
  //   // If the filter item is already selected, remove it from the list
  //   const newFilterItems = isSelected
  //     ? filterItems.filter(
  //         (item) => item.filterName !== filteredItem.filterName
  //       )
  //     : [...filterItems, filteredItem];
  //   setFilterItems(newFilterItems);
  // };

  // const handleMenuItemSelected = (menuItemName: string) => {
  //   // Save the iteration of the menu items, if possible
  //   if (menuItemName === "All") {
  //     // If the menu item is "All", set the menu item to undefined
  //     setMenuItem(null);
  //     return;
  //   }
  //   // Else, find the menu item from the menu items
  //   const menuItem: MenuType | undefined = MENU_ITEMS.find(
  //     (item) =>
  //       item.filterDisplayName === menuItemName ||
  //       item.filterName === menuItemName
  //   );
  //   setMenuItem(menuItem || null);
  // };

  useLayoutEffect(() => {
    // Get all of the searchParams and put the properties into a string list
    const paramItemList: { key: string; value: string }[] = [];
    searchParams.forEach((value, key) => {
      // If the value is not empty, add it to the list
      if (key !== "" && value !== "") {
        paramItemList.push({ key, value });
      }
    });
    // If the paramItemList is empty, return
    if (paramItemList.length === 0) return;

    // const filterItemList = [];
    // for (const item in paramItemList) {
    //   // If the item is a filter item, add it to the list
    //   const filterItem = FILTER_ITEMS.find(
    //     (filterItem) => filterItem.filterName === paramItemList[item].key
    //   );
    //   if (filterItem) {
    //     filterItemList.push(filterItem);
    //   }
    // }
    // setFilterItems(filterItemList);

    // // Match a manu name with a param name
    // let menuItem: MenuType | undefined;
    // for (const item in paramItemList) {
    //   // If the item is a filter item, add it to the list
    //   menuItem = MENU_ITEMS.find(
    //     (filterItem) => filterItem.filterName === paramItemList[item].key
    //   );
    // }
    // if (menuItem) {
    //   handleMenuItemSelected(menuItem.filterDisplayName || menuItem.filterName);
    // }

    const page = paramItemList.find((item) => item.key === "page");
    if (page) {
      // If the page is not a number, set it to 1
      const pageNumber = parseInt(page.value);
      if (isNaN(pageNumber)) {
        setSearchParams({ page: "1" });
      } else {
        setSearchParams({ page: page.value });
      }
    }
    // const search = paramItemList.find((item) => item.key === "search");
    // handleTextChanged(search?.value || "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set the initial app data to that of the list in the query response
  useEffect(() => {
    if (!data || isLoading) return;
    setApiData(data);
  }, [data, isLoading]);

  // Fetch the paginated data and url after any param changes
  useEffect(() => {
    if (!apiData || isLoading || listLoading) return;
    updateUrlWithParams();
    updatePaginatedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // filterItems,
    // menuItem,
    pageParamString,
    searchParams,
    searchInputValue,
    apiData,
  ]);

  if (error) {
    return (
      <PageContainer>
        <div className="flex justify-center">
          <div className="text-lg">
            There was a problem loading the data. Please check your internet
            connection and try again.
          </div>
        </div>
      </PageContainer>
    );
  }
  return (
    <PageContainer
      isLoading={paginatedData === undefined || isLoading || listLoading}
      toolbar={
        <AppToolbar
          sidebarTrigger
          searchbar={
            <Searchbar
              className="flex-1"
              initialValue={""}
              onSearchInputChanged={handleTextChanged}
            />
          }
        />
      }
    >
    <div></div>
    </PageContainer>
  );
};

export default QueryList;
