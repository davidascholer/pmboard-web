// Need to use the React-specific entry point to allow generating React hooks
import {
  API_ROOT_URL,
  PRIMARY_RESOURCE_TYPE,
} from "@/app/api/controller/dynamic/constants";
import {
  ExternalApiDetailType,
  ExternalApiListResponseType,
} from "@/app/api/controller/dynamic/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  // Base name of reducer (similar to slice name)
  reducerPath: "api",
  // Specify the API endpoint
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT_URL }),
  tagTypes: ["API"],
  // Define the collection of the endpoints of the api we want to use
  endpoints: (builder) => ({
    // Define the subfolder of the endpoint
    getList: builder.query<ExternalApiListResponseType, string>({
      query: (listUrl: string) => {
        return listUrl;
      },
    }),
    getAPIListAll: builder.query({
      // Add the subfolder to the endpoint (our list view )
      query: () => {
        console.debug("List URL: ", API_ROOT_URL + "/" + PRIMARY_RESOURCE_TYPE + "?limit=10000");
        return API_ROOT_URL + "/" + PRIMARY_RESOURCE_TYPE + "?limit=10000";
      },
    }),
    // builder.query<ReturnType, ParamType>
    getListDetail: builder.query<ExternalApiDetailType, string>({
      query: (detailUrl: string) => {
        return detailUrl;
      },
    }),
    // Mutation example. Uncomment, export, and customize as needed
    // createPost: builder.mutation<ReturnType, ArgsType>({
    //   query: (args) => ({
    //     url: "/posts",
    //     method: "POST",
    //     body: args,
    //   }),
    //   invalidatesTags: ["API"],
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetListQuery, useGetListDetailQuery, useGetAPIListAllQuery, usePrefetch } = apiSlice;
