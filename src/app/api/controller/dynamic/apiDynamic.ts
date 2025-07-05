/* Works with APIs with the following structure:
 * - List endpoint - api.com/v1/resource/
 * - Detail endpoint - api.com/v1/resource/id
 * - Paginated endpoint - none supported by default
 * - Search/Filtered endpoint - api.com/v1/search?hasImages=true&q=pizza
 * - This API only supports filters if there is a search query
 */

import {
  AltImageType,
  ApiDetailType,
  ApiListItemType,
  ApiListRequestType,
  ApiListResponseType,
  DescriptionType,
  FilterType,
} from "../static/types";
import {
  API_ROOT_URL,
  DEBUG,
  PRIMARY_RESOURCE_TYPE,
  // FILTER_ITEMS,
  // MENU_ITEMS,
} from "./constants";
import { ExternalApiDetailType, ExternalApiListResponseType } from "./types";

/**
 * Convert the filter items to the expected string format
 * @param data
 * @type ApiListRequestType
 * {
 *  base: string;
 *  resource: ResourceType
 *  currentPage:number;
 *  listingsPerPage: number;
 *  filters?:FilterType[];
 *  search?:string;
 * }
 * @returns The url string
 * @example base + '/search?' + [`${filter.filterName}=${true}&`,...] + `q=${search}`
 * @example https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=sunflowers
 */
// export const externalGenerateFilterSearchUrl = (
//   data: ApiListRequestType
// ): string => {
//   // Use the following line in case the API signature expects the example format: api.com/resource?listings-per-page=50&page=2&search=pizza
//   // return generateApiUrl(data); // From apiStatic.ts

//   // Filters
//   let filterArrayAsString: string = "";
//   const filters: FilterType[] = data.filters || [];
//   for (const filter of filters) {
//     filterArrayAsString += filter.filterName + "=" + filter.filterValue + "&";
//   }
//   // Search
//   const searchInput: string =
//     data.search && data.search !== ""
//       ? encodeURIComponent(data.search)
//       : "art";
//   // Return the final URL
//   return "/search?" + filterArrayAsString + `q=${searchInput}`;
// };

// const getDepartmentItems: Promise<FilterType[]> = async () => {
//   // Fetch the menu items from the API
//   const response = await fetch(`${API_ROOT_URL}/departments`);
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   const data: { departments: { departmentId: number; displayName: string }[] } =
//     await response.json();
//   const menuItems = data.departments.map((item) => ({
//     filterName: item.departmentId,
//     filterValue: item.displayName,
//   }));
//   return menuItems;
// };

export const filterAllDataBySearchString = (
  searchString: string,
  data: ExternalApiListResponseType
): ExternalApiListResponseType => {
  const filteredResults = data.results.filter((item) => {
    // Check if the search string is present in the name of the item
    return item.name.toLowerCase().includes(searchString.toLowerCase());
  });
  return {
    ...data,
    results: filteredResults,
  };
};

// export const getFilterItems = (): string[] => {
//   const filterItems: FilterType[] = FILTER_ITEMS;
//   const items: string[] = filterItems.map((item) => {
//     return item.filterDisplayName ? item.filterDisplayName : item.filterName;
//   });
//   return items;
// };

// export const getMenuItems = (): string[] => {
//   const filterItems: FilterType[] = MENU_ITEMS;
//   const items: string[] = filterItems.map((item) => {
//     return item.filterDisplayName ? item.filterDisplayName : item.filterName;
//   });
//   return items;
// };

/**
 * Takes in the full data and returns the paginated data
 * @param data The complete list data object from the API
 * @returns A pagination response with the list of paginated data dependant on the page and page size
 */
export const externalGetPaginatedDataFromAllData = async (
  data: ExternalApiListResponseType,
  page: number,
  itemsPerPage: number
): Promise<ApiListResponseType> => {
  try {
    // Get the full data list from the query data
    const fullItemList = data.results;

    if (!fullItemList) throw new Error("No objectIDs found in the data");

    // Slice out the paginated item list
    const startIndex = (page - 1) * itemsPerPage;
    let endIndex = page * itemsPerPage;
    if (endIndex > fullItemList.length) {
      endIndex = fullItemList.length - 1;
    }
    const paginatedItemList: ExternalApiListResponseType["results"] =
      fullItemList.slice(startIndex, endIndex);

    // Fetch the details for each item in the paginated list
    const paginatedItems: (ApiListItemType | undefined)[] = await Promise.all(
      paginatedItemList.map(async (item) => {
        const response = await fetch(
          `${API_ROOT_URL}/${PRIMARY_RESOURCE_TYPE}/${item.name}`
        );
        if (!response.ok) {
          // console.error(`Error fetching from ${API_ROOT_URL}/objects/${item}`);
          return undefined; // Return undefined if the fetch fails
        }
        const data: ExternalApiDetailType = await response.json();
        const returnData: ApiListItemType = {
          id: data.id,
          name: data.name || "Unknown",
          imageUrl: data.sprites?.front_default || "",
          description: "",
        };
        return returnData;
      })
    );
    // Filter out any undefined items
    const itemSet = paginatedItems.filter((item) => item !== undefined);

    if (DEBUG) console.debug("paginatedItems itemSet", itemSet);

    const paginatedData: ApiListResponseType = {
      paginatedList: itemSet,
      totalPages: Math.ceil(fullItemList.length / itemsPerPage),
      currentPage: page,
      totalItemCount: fullItemList.length,
    };
    return paginatedData;
  } catch (error) {
    console.error("Error in externalGetPaginatedDataFromAllData", error);
    // Return an empty paginated data object
    return {
      paginatedList: [],
      totalPages: 0,
      currentPage: 0,
      totalItemCount: 0,
    };
  }
};

// /* Helper functions */
/**
 * Format a single detail object to the UI's expected output (description1, ...)
 * @param data
 * @returns The image url, a title, and up to 6 description rows
 */
export const formatExternalDataToDetail = (
  data: ExternalApiDetailType
): ApiDetailType => {
  const descriptionItems: DescriptionType[] = [];
  if (data?.abilities) {
    const abilityNames = data.abilities?.map((a) => a.ability.name).join(", ");
    if (abilityNames && abilityNames !== "")
      descriptionItems.push({
        title: "Abilities",
        description: abilityNames,
      });
  }
  if (data?.base_experience)
    descriptionItems.push({
      title: "Base Experience",
      description: String(data.base_experience),
    });
  if (data?.height)
    descriptionItems.push({
      title: "Height",
      description: String(data.height) + " decimetres",
    });
  if (data?.weight)
    descriptionItems.push({
      title: "Weight",
      description: String(data.weight) + " hectograms",
    });
  if (data?.forms) {
    const formNames = data.forms?.map((form) => form.name).join(", ");
    if (formNames && formNames !== "")
      descriptionItems.push({
        title: "Forms",
        description: formNames,
      });
  }
  if (data?.species) {
    descriptionItems.push({
      title: "Species",
      description: data.species.name || "Unknown Species",
    });
  }

  const altImageItems: AltImageType[] = [];
  // for (const image of data.sprites || []) {
  //   altImageItems.push({
  //     title: data.title,
  //     url: image,
  //   });
  // }

  if (DEBUG) console.debug("formatExternalDataToDetail", data);
  return {
    title: data.name || "Unknown",
    imageUrl: data.sprites?.front_default || "",
    descriptionItems: descriptionItems,
    altImageUrls: altImageItems || [],
  };
};

/**
 * Takes in a search string and returns the response
 * A fetch call similar to the query
 *  @param searchText The search input from the user
 *  @returns The api response
 */
export const getDataFromSearchUrl = async (searchUrl: string) => {
  const response = await fetch(searchUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (DEBUG) console.debug("getListFromSearch data", data);
  return data.objectIDs;
};

/**
 * Inputs a data list and makes a fetch request for each item
 * @param dataList The list (of strings/ids) to fetch
 * @returns A list with appended details
 */
export const getDetailsFromIDs = async (
  dataList: number[] | string[]
) => {
  console.debug("dataList", dataList);
  // Async function to get the image URL from the detail API
  const getInfoFromDetail = async (
    name: string
  ): Promise<ApiListItemType | undefined> => {
    console.debug("name", name);
    const response = await getDataDetail(name);
    if (!response.data) return;
    const data = response.data as ExternalApiDetailType;
    console.debug("data", data);
    return {
      id: 0,
      name: data.name || "Unknown",
      imageUrl: data.sprites?.front_default || "",
      description: data.abilities?.join(" ") || "",
    };
  };

  const itemSet = await Promise.all(
    dataList.map((name) => getInfoFromDetail(String(name)))
  );
  console.debug("getDetailsFromIDs itemSet", itemSet);

  return itemSet.filter((item) => item !== undefined) as ApiListItemType[];
};

/**
 * API query detail
 * @returns the data list from the API
 */
export const getDataDetail = async (name: string) => {
  try {
    const response = await fetch(
      `${API_ROOT_URL}/${PRIMARY_RESOURCE_TYPE}/${name}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // Return format for RTK Query
    const returnData: { data: object; error?: undefined } = {
      data: data,
    };
    return returnData;
  } catch (error) {
    // Return format for RTK Query error
    const returnData: { error: unknown; data?: undefined } = {
      error: error,
    };
    return returnData;
  }
};

/**
 * Convert the filter items to the expected string format
 * Use this in case the API string already matches the expected signature
 * @param data
 * {
 *  base: string;
 *  resource: ResourceType
 *  currentPage:number;
 *  listingsPerPage: number;
 *  filters?:FilterType[];
 *  search?:string;
 * }
 * @returns The url string
 * @example api.com/v1/resource?listings-per-page=50&page=2&search=pizza
 */
export const generateFilterSearchUrl = (data: ApiListRequestType): string => {
  // Generate a URL string based on the provided data
  let filterArrayAsString = data.base;
  filterArrayAsString += `/${data.resource}?`;
  // listings per page
  // If listingsPerPage is not set or is less than or equal to 0, default to 50
  if (
    data.listingsPerPage === undefined ||
    data.listingsPerPage === null ||
    data.listingsPerPage <= 0
  ) {
    filterArrayAsString += `listings-per-page=50&`;
  } else {
    filterArrayAsString += `listings-per-page=${data.listingsPerPage}&`;
  }
  // current page
  filterArrayAsString += `page=${data.currentPage}&`;
  // filters
  const filters: FilterType[] = data.filters || [];
  for (const filter of filters) {
    filterArrayAsString += filter.filterName + "=" + filter.filterValue + "&";
  }
  // search
  // const searchInput = data.search || "";
  // if (searchInput !== "") {
  //   filterArrayAsString += `search=${encodeURIComponent(searchInput)}&`;
  // }
  // Remove the last '&' if it exists
  const returnParamUrl = filterArrayAsString.endsWith("&")
    ? filterArrayAsString.slice(0, -1)
    : filterArrayAsString;
  // Return the final URL
  return returnParamUrl;
};
