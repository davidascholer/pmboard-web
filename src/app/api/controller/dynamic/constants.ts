// import { FilterType, MenuType } from "../static/types";
import { ExternalResourceType } from "./types";

/* Vars */
export const DEBUG = false;
export const ITEMS_PER_PAGE = 50;
export const API_ROOT_URL =
  "https://pokeapi.co/api/v2"; 
export const PRIMARY_RESOURCE_TYPE: ExternalResourceType = "pokemon";
// export const FILTER_ITEMS: FilterType[] = [
//   {
//     filterDisplayName: "Highlight",
//     filterName: "isHighlighted",
//     filterValue: true,
//     filterAbout:
//       "Highlight indicates whether the object is a highlight of the collection.",
//   },
//   // api doesn't return correctly with this
// //   {
// //     filterDisplayName: "Has Image",
// //     filterName: "hasImages",
// //     filterValue: true,
// //     filterAbout: "Has Image indicates whether the object has an image.",
// //   },
//   {
//     filterDisplayName: "Is Public Domain",
//     filterName: "isPublicDomain",
//     filterValue: true,
//     filterAbout:
//       "Is Public Domain indicates whether the object is in the public domain.",
//   },
//   {
//     filterDisplayName: "Is On View",
//     filterName: "isOnView",
//     filterValue: true,
//     filterAbout:
//       "Is On View indicates whether the object is on view in the museum.",
//   },
// ];

// export const MENU_ITEMS: MenuType[] = [
//   {
//     filterDisplayName: "Title",
//     filterName: "title",
//     filterValue: true,
//     filterAbout: "Searches the title of objects.",
//   },
//   {
//     filterDisplayName: "Tags",
//     filterName: "tags",
//     filterValue: true,
//     filterAbout: "Returns keyword tags fields.",
//   },
//   {
//     filterDisplayName: "Artist and Culture",
//     filterName: "artistOrCulture",
//     filterValue: true,
//     filterAbout: "Returns objects that match the artist name or culture.",
//   },
// ];

// export const ADVANCED_FILTER_ITEMS: MenuType[] = [
//   {
//     filterDisplayName: "Location",
//     filterName: "geoLocation",
//     filterValue: string | string | string | ...,
//     filterAbout: "Returns objects that match the artist name or culture.",
//   },
//   {
//     filterDisplayName: "",
//     filterName: "medium",
//     filterValue: string | string | string | ...,
//     filterAbout: ` Returns items that match the query and are of the specified medium or object type. Examples include: "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc.`,
//   },
//   {
//     filterDisplayName: "",
//     filterName: "medium",
//     filterValue: string | string | string | ...,
//     filterAbout: `Returns items that match the specified geographic location. Examples include: "Europe", "France", "Paris", "China", "New York", etc.`,
//   },
//   {
//     // e.g.dateBegin=1700&dateEnd=1800 
//     filterDisplayName: "",
//     filterName: "medium",
//     filterValue: number & number,
//     filterAbout: `Returns items that match the query and fall between the begin and end dates.`,
//   },
// ];
