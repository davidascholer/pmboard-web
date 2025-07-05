import {
  createUser,
  fetchAuthTokens,
  getUser,
  refreshAccessToken,
  sendActivationEmail,
  verifyAccessToken,
} from "../controller/userApi";
import { DOMAIN, SERVER_URL } from "@/shared/constants";
import { ApiResponseType, ErrorResponseType } from "@/shared/types";
import { setUserDetails } from "@/state/services/userSlice";
import store from "@/state/store";

/**
 * Utility function to fetch with headers
 * @param path
 * @returns standard fetch response
 */
export const fetchWithHeaders = async (
  path: string,
  {
    method,
    headers,
    body,
  }: {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    headers?: object;
    body?: object;
  }
) => {
  const url = SERVER_URL + path;
  const requestHeaders = headers ? headers : {};
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...requestHeaders,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // Debugging: Uncomment the following lines to log the request and response
  // //// Uncomment below here
  // console.debug("process.env.NODE_ENV",process.env.NODE_ENV)
  // console.debug("request to API (fetchWithHeaders):", {
  //   url,
  //   method,
  //   headers: {
  //     "Content-Type": "application/json",
  //     ...headers,
  //   },
  //   body: body ? JSON.stringify(body) : undefined,
  // });
  // console.debug("response from api (fetchWithHeaders):", response);
  //// Uncomment above here

  return response;
};

/**
 * Handle the response data from the API
 * @description The function will return the response data if the status code is 200 or 201, otherwise it will return the error message.
 * @param response standard 'fetch' response
 * @param data json serialized data
 * @returns App type response
 */
export const validateResponse = async (
  response: Response,
  data: unknown,
  returnData: unknown,
  expectedStatus = 200
) => {
  if (response.status !== expectedStatus) {
    return {
      ok: false,
      status: response.status,
      error: (data as ErrorResponseType).error,
    };
  }

  return {
    ok: true,
    status: response.status,
    data: returnData,
  };
};

/**
 * Fetch auth tokens, save the access token to the state and the refresh token to the local storage
 * @param email
 * @param password
 * @returns the bad response or a basic success response
 */
export const createUserAccount = async ({
  email,
  password,
  passwordConfirm,
}: {
  email: string;
  password: string;
  passwordConfirm: string;
}): Promise<ApiResponseType> => {
  // Create the user
  const createNewUser = await createUser({
    email,
    password,
    password2: passwordConfirm,
  });
  if (!createNewUser.ok) {
    console.warn("Failed to create user in userSignUp");
    return createNewUser;
  }

  // Send the user activation email
  const sendActivationEmailResponse = await sendActivationEmail({ email });
  if (!sendActivationEmailResponse.ok) {
    return sendActivationEmailResponse;
  }

  return {
    ok: true,
    status: 200,
  };
};

/**
 * Fetch auth tokens, save the access token to the state and the refresh token to the local storage
 * @param email
 * @param password
 * @returns the bad response or a basic success response
 */
export const userSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ApiResponseType> => {
  // Fetch the auth tokens
  try {
    const authTokenResponse = await fetchAuthTokens({ email, password });
    if (!authTokenResponse.data?.access || !authTokenResponse.data?.refresh) {
      return {
        ok: false,
        status: authTokenResponse.status,
        error: authTokenResponse.error || "Failed to fetch auth tokens",
      };
    }

    // Save the access and refresh token to the local storage
    localStorage.setItem(DOMAIN + "-at", authTokenResponse.data.access);
    localStorage.setItem(DOMAIN + "-rt", authTokenResponse.data.refresh);

    // Fetch user data after signing in to update the user state
    getSetUserData();
    return {
      ok: true,
      status: 200,
    };
  } catch (error) {
    console.error("Failed to sign in user:", error);
    return {
      ok: false,
      status: 400,
      error: "Failed to sign in user",
    };
  }
};

/**
 * Get the auth token. If the user access token is denied, the function will attempt to refresh with the refresh token.
 * @returns an authenticated access token
 */
export const verifyUserSession = async (): Promise<
  (ApiResponseType & { authToken: string }) | ErrorResponseType
> => {
  // Fetch the auth token from state
  const accessToken = localStorage.getItem(DOMAIN + "-at");

  if (accessToken) {
    // Verify the user data
    const verificationResponse = await verifyAccessToken({ accessToken });
    if (verificationResponse.ok) {
      return {
        ok: true,
        status: 200,
        authToken: accessToken,
      };
    }
  }

  // Fetch the refresh token from local storage
  const refreshToken = localStorage.getItem(DOMAIN + "-rt");
  if (refreshToken) {
    // Refresh the access token
    const refreshResponse = await refreshAccessToken({ refreshToken });
    const newAccessToken = refreshResponse.data?.access;
    if (refreshResponse.ok && newAccessToken) {
      // Save the new access token to the state
      localStorage.setItem(DOMAIN + "-at", newAccessToken);

      return {
        ok: true,
        status: 200,
        authToken: newAccessToken,
      };
    }
  }

  return {
    ok: false,
    status: 404,
    error: "Invalid user session",
  };
};

/**
 * Get user data. If the user access token is denied, refresh with the refresh token.
 * @param email
 * @param password
 * @returns the user object
 */
export const getSetUserData = async (): Promise<ApiResponseType> => {
  // Fetch the auth token from state
  const accessToken = localStorage.getItem(DOMAIN + "-at");
  if (!accessToken) {
    return {
      ok: false,
      status: 404,
      error: "No access token",
    };
  }

  // Fetch the user data and refresh the access token if needed
  const verifyUserResponse = await verifyUserSession();
  if (!verifyUserResponse.ok) {
    return {
      ok: false,
      status: 401,
      error: "Invalid user",
    };
  }
  // Fetch the user data
  const newUserResponse = await getUser({ authToken: accessToken });

  if (!newUserResponse.ok) {
    return {
      ok: false,
      status: 404,
      error: newUserResponse.error || "Failed to fetch user data",
    };
  }

  // Successfully fetched user data
  // Dispatch the user data to the store
  store.dispatch(setUserDetails(newUserResponse.data));

  return {
    ok: true,
    status: 200,
  };
};

