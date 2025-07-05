import { ExternalResourceType } from "../dynamic/types";

// List types
export type ResourceType = ExternalResourceType;
type FilterValueType = number | string | boolean;
// Many can be elected
export type FilterType = {
  filterDisplayName?: string;
  filterAbout?: string;
  filterName: string;
  filterValue: FilterValueType;
};
// Only one can be selected
export type MenuType = FilterType
export type ApiListRequestType = {
  base: string;
  resource: ResourceType;
  currentPage: number;
  listingsPerPage: number;
  filters?: FilterType[];
  search?: string;
};
export type ApiListItemType = {
  id?: number;
  name: string;
  imageUrl?: string;
  description?: string;
};
export type ApiListResponseType = {
  paginatedList: ApiListItemType[];
  totalPages: number;
  currentPage: number;
  totalItemCount: number;
};

// Detail types
export type DescriptionType = {
  title?: string;
  description: string;
};
export type AltImageType = {
  title?: string;
  url: string;
};
export type ApiDetailType = {
  imageUrl: string;
  title: string;
  descriptionItems: DescriptionType[];
  altImageUrls?: AltImageType[];
};
