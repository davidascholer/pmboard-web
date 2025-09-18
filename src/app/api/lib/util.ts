import { ApiParams, ApiRequestData } from "../types/api-requests";
import { API_BASE_URL } from "./constants";

// Higher-order function for making API calls
export const createApiCall = <T = unknown>(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  requiresAuth: boolean = true
) => {
  return async (data?: ApiRequestData, params?: ApiParams): Promise<T> => {
    let url = `${API_BASE_URL}${endpoint}`;
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`:${key}`, value);
      });
    }

    const makeRequest = async (token?: string): Promise<T> => {
      const config: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(requiresAuth && token && { Authorization: `Bearer ${token}` }),
        },
      };

      if (data && (method === "POST" || method === "PATCH")) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    };

    if (!requiresAuth) {
      return makeRequest();
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token available");
    }

    try {
      return await makeRequest(accessToken);
    } catch (error) {
      // If auth fails, try to refresh token
      if (error instanceof Error && error.message.includes("401")) {
        const refreshToken = localStorage.getItem("refreshToken");
        try {
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }
          const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          });

          if (refreshResponse.ok) {
            const { accessToken: newAccessToken } =
              await refreshResponse.json();
            localStorage.setItem("accessToken", newAccessToken);
            return makeRequest(newAccessToken);
          }
        } catch {
          // Refresh failed, clear tokens
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          throw new Error("Authentication failed and token refresh failed");
        }

        // No refresh token or refresh failed
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        throw new Error("Authentication required");
      }
      throw error;
    }
  };
};

// Helper function to get auth token (implement based on your auth system)
export const getAuthToken = (): string => {
  // Replace with your actual token retrieval logic
  return localStorage.getItem("authToken") || "";
};
