import { createApiCall } from "../lib/util";

// AUTH API CALLS
export const authApi = {
  // Refresh access token
  refreshToken: createApiCall("/auth/refresh", "POST"),
};
