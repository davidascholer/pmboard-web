import { ApiResponseType } from "@/shared/types";
import { ApiParams, ApiRequestData } from "../types/api-requests";
import { API_BASE_URL } from "./constants";
import store from "@/state/store";

// Higher-order function for making API calls
export const createApiCall = <T = unknown>(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  requiresAuth: boolean = true
) => {
  return async (
    data?: ApiRequestData,
    params?: ApiParams
  ): Promise<ApiResponseType & { data?: T }> => {
    let url = `${API_BASE_URL}${endpoint}`;
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`:${key}`, value);
      });
    }

    const makeRequest = async (
      token?: string
    ): Promise<ApiResponseType & { data?: T }> => {
      const config: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:5173",
          ...(requiresAuth && token && { Authorization: `Bearer ${token}` }),
        },
        credentials: "include",
      };

      if (data && (method === "POST" || method === "PATCH")) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);
      console.log("API Response Raw:", response);
      const responseData = await response.json();
      console.log("API Response Data:", responseData);
      if (!response.ok) {
        return {
          ok: response.ok,
          status: response.status,
          message: responseData.message || "Error",
        };
      }
      return {
        ok: true,
        status: response.status,
        message: responseData.message || "Success",
        data: responseData,
      };
    };

    if (!requiresAuth) {
      return makeRequest();
    }

    const accessToken = store.getState().user.authToken;

    try {
      return await makeRequest(accessToken);
    } catch (error) {
      // If auth fails, try to refresh token
      if (error instanceof Error && error.message.includes("401")) {
        try {
          const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });

          if (refreshResponse.ok) {
            const { accessToken: newAccessToken } =
              await refreshResponse.json();
            store.dispatch({
              type: "user/setAuthToken",
              payload: newAccessToken,
            });
            return makeRequest(newAccessToken);
          }
        } catch {
          throw new Error("Authentication failed and token refresh failed");
        }

        throw new Error("Authentication required");
      }
      throw error;
    }
  };
};
