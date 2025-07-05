import { DOMAIN } from "@/shared/constants";
import { fetchWithHeaders } from "../util/util";
import { ApiResponseType, UserProfileType } from "@/shared/types";

/**
 * Create a user
 * @host /auth/users/
 * @param email
 * @param password
 * @param password2
 * @returns A response without data
 */
export const createUser = async ({
  email,
  password,
  password2,
}: {
  email: string;
  password: string;
  password2: string;
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/auth/users/", {
    method: "POST",
    headers: {},
    body: {
      email,
      password,
      password2,
      domain: DOMAIN, // Include domain to match the expected input in the backend
    },
  });
  let message = await response.json();
  if (message.non_field_errors) {
    message = message.non_field_errors;
    if (
      typeof message === "object" &&
      Array.isArray(message.non_field_errors) &&
      message.non_field_errors.length > 0
    )
      message = message.non_field_errors[0];
  }
  if (message.password) {
    message = message.password;
    if (
      typeof message === "object" &&
      Array.isArray(message.password) &&
      message.password.length
    )
      message = message.password[0];
  }
  if (message.error) {
    message = message.error;
    if (
      typeof message === "object" &&
      Array.isArray(message.error) &&
      message.error.length
    )
      message = message.error[0];
  }

  if (response.status === 201) {
    return {
      ok: true,
      status: 201,
      data: message,
    };
  }
  return {
    ok: false,
    status: response.status,
    error: message,
  };
};

/**
 * Send an activation email
 * @host /mfa/send_mfa_token/
 * @param email
 * @returns a response without data
 */
export const sendActivationEmail = async ({
  email,
}: {
  email: string;
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/mfa/send_mfa_token/", {
    method: "POST",
    headers: {},
    body: {
      email,
      domain: DOMAIN, // Include domain to match the expected input in the backend
    },
  });
  const data = await response.json();
  if (response.status === 200) {
    return {
      ok: true,
      status: response.status,
    };
  }
  return {
    ok: false,
    status: response.status,
    error: data.message || "Failed to send activation email",
  };
};

/**
 * Send an email with a code for mfa or verification
 * @host /mfa/send_mfa_code/
 * @param email
 * @returns a response without data
 */
export const sendMFACodeEmail = async ({
  email,
}: {
  email: string;
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/mfa/send_mfa_code/", {
    method: "POST",
    headers: {},
    body: {
      email,
      domain: DOMAIN, // Include domain to match the expected input in the backend
    },
  });
  if (response.status === 200) {
    return {
      ok: true,
      status: response.status,
    };
  }
  return {
    ok: false,
    status: response.status,
    error: "Failed to send email",
  };
};

/**
 * Activate a user with the token received in their email
 * @host /profile/activate_user/
 * @param token
 * @returns a response with confirmation message in the data field
 */
export const activateUser = async ({
  token,
}: {
  token: string;
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/profile/activate_user/", {
    method: "POST",
    headers: {},
    body: { token },
  });
  if (response.status === 200) {
    return {
      ok: true,
      status: response.status,
      data: {},
    };
  }
  return {
    ok: false,
    status: response.status,
    error: "Failed to activate user",
  };
};

/**
 * Sets the user's account to active = false
 * @host /profile/deactivate_user/
 * @param token
 * @returns a response with confirmation message in the data field
 */
export const deactivateUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/profile/deactivate_user/", {
    method: "POST",
    headers: {},
    body: {
      email,
      password,
      domain: DOMAIN, // Include domain to match the expected input in the backend
    },
  });
  if (response.status === 200) {
    return {
      ok: true,
      status: response.status,
      data: {},
    };
  }
  return {
    ok: false,
    status: response.status,
    error: "Failed to activate user",
  };
};

type FetchAuthTokensResponseType = { access: string; refresh: string };
/**
 * Fetch auth tokens for sign in
 * @host /auth/jwt/create/
 * @param email
 * @param password
 * @returns an access token and a refresh token in the data field
 */
export const fetchAuthTokens = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ApiResponseType & { data?: FetchAuthTokensResponseType }> => {
  const response = await fetchWithHeaders("/auth/jwt/create/", {
    method: "POST",
    headers: {},
    body: {
      email,
      password,
      domain: DOMAIN, // Include domain to match the expected input in the backend
    },
  });
  if (response.status === 200) {
    const data: FetchAuthTokensResponseType = await response.json();
    return {
      ok: true,
      status: response.status,
      data,
    };
  }
  let message = await response.json();
  if (message.non_field_errors) message = message.non_field_errors[0];
  if (message.password) message = message.password[0];
  if (message.error) {
    if (message.error[0]) message = message.error[0];
    else message = message.error;
  }
  return {
    ok: false,
    status: response.status,
    error: message,
  };
};

type FetchPasswordResponseType = { access: string };
/**
 * Refresh the access token with the refresh token
 * @host /auth/jwt/refresh/
 * @param refreshToken
 * @returns an access token and a refresh token in the data field
 */
export const refreshAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<ApiResponseType & { data?: FetchPasswordResponseType }> => {
  const response = await fetchWithHeaders("/auth/jwt/refresh/", {
    method: "POST",
    headers: {},
    body: { refresh: refreshToken },
  });
  if (response.status === 200) {
    const data: FetchPasswordResponseType = await response.json();
    return {
      ok: true,
      status: response.status,
      data,
    };
  }
  return {
    ok: false,
    status: response.status,
    error: "Failed to refresh access token",
  };
};

/**
 * Verify the access token is valid
 * @host /auth/jwt/verify/
 * @param accessToken
 * @returns an empty object with a 200 or a 401 result code
 */
export const verifyAccessToken = async ({
  accessToken,
}: {
  accessToken: string;
}): Promise<ApiResponseType & { data?: FetchPasswordResponseType }> => {
  const response = await fetchWithHeaders("/auth/jwt/verify/", {
    method: "POST",
    headers: {},
    body: { token: accessToken },
  });
  if (response.status === 200) {
    return {
      ok: true,
      status: response.status,
    };
  }
  return {
    ok: false,
    status: response.status,
    error: "Token is invalid or expired",
  };
};

/**
 * Get user data
 * @host /profile/get_user/
 * @headers Authorization token with a JWT prefix
 * @returns a response with user data
 */
export const getUser = async ({
  authToken,
}: {
  authToken: string;
}): Promise<ApiResponseType & { data?: UserProfileType }> => {
  const response = await fetchWithHeaders("/profile/get_user/", {
    method: "GET",
    headers: {
      Authorization: `JWT ${authToken}`,
    },
  });
  const data: UserProfileType = await response.json();
  if (response.status === 200) {
    return {
      ok: true,
      status: response.status,
      data,
    };
  }
  return {
    ok: false,
    status: response.status,
    error: data ? JSON.stringify(data) : "Failed to fetch user information",
  };
};

/**
 * Update user data
 * @host /profile/update_user/
 * @headers Authorization token with a JWT prefix
 * @param ...updated fields
 * @returns a response with user data
 */
export const updateUser = async ({
  authToken,
  updatedUserItems,
}: {
  authToken: string;
  updatedUserItems: object;
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/profile/get_user/", {
    method: "PATCH",
    headers: {
      Authorization: `JWT ${authToken}`,
    },
    body: { ...updatedUserItems },
  });
  if (response.status === 200) {
    const data: UserProfileType = await response.json();
    return {
      ok: true,
      status: response.status,
      data,
    };
  }
  return {
    ok: false,
    status: response.status,
    error: "Failed to update user",
  };
};

/**
 * Reset a user's password
 * @host /profile/reset_password/
 * @param email
 * @param password
 * @param code
 * @returns a response with user data
 */
export const resetPassword = async ({
  email,
  password,
  code,
}: {
  email: string;
  password: string;
  code: string;
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/profile/reset_password/", {
    method: "POST",
    headers: {},
    body: {
      email,
      password,
      code,
      domain: DOMAIN, // Include domain to match the expected input in the backend
    },
  });
  let message = await response.json();
  if (message[0]) message = message[0];
  if (response.status !== 200) {
    return {
      ok: false,
      status: response.status,
      error: message,
    };
  }
  return {
    ok: true,
    status: response.status,
    data: {},
  };
};

/**
 * Get the settings from a user.
 * @host /profile/user_settings/
 * @headers Authorization token with a JWT prefix
 * @param authToken
 * @returns an api response with a status response along with either data object or an error string
 */
export const getUserSettings = async ({
  authToken,
}: {
  authToken: string;
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/profile/user_settings/", {
    method: "GET",
    headers: {
      Authorization: `JWT ${authToken}`,
    },
  });
  if (response.status !== 200) {
    return {
      ok: false,
      status: response.status,
      error: (response as ApiResponseType).error,
    };
  }

  const data = (await response.json()) as {
    settings: UserProfileType["settings"];
  };
  return {
    ok: true,
    status: response.status,
    data: data.settings,
  };
};

/**
 * Set the entire settings for a user.
 * @host /profile/user_settings/
 * @headers Authorization token with a JWT prefix
 * @param authToken
 * @returns an api response with a status response along with either data object or an error string
 */
export const setUserSettings = async ({
  authToken,
  theme,
}: {
  authToken: string;
  theme: UserProfileType["settings"]["theme"];
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/profile/user_settings/", {
    method: "POST",
    headers: {
      Authorization: `JWT ${authToken}`,
    },
    body: {
      theme,
    },
  });
  if (response.status !== 200) {
    return {
      ok: false,
      status: response.status,
      error: (response as ApiResponseType).error,
    };
  }

  const data = (await response.json()) as {
    settings: UserProfileType["settings"];
  };

  return {
    ok: true,
    status: response.status,
    data,
  };
};

/**
 * Set a partial object of existing fields to a user
 * @host /profile/user_settings/
 * @headers Authorization token with a JWT prefix
 * @param authToken
 * @returns an api response with a status response along with either data object or an error string
 */
export const editUserSettings = async ({
  authToken,
  settings,
}: {
  authToken: string;
  settings: UserProfileType["settings"];
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/profile/user_settings/", {
    method: "PATCH",
    headers: {
      Authorization: `JWT ${authToken}`,
    },
    body: { settings },
  });
  if (response.status !== 200) {
    return {
      ok: false,
      status: response.status,
      error: (response as ApiResponseType).error,
    };
  }

  const data = (await response.json()) as {
    settings: UserProfileType["settings"];
  };

  return {
    ok: true,
    status: response.status,
    data: data.settings,
  };
};

/**
 * Get the notifications from a profile for a user.
 * Must be logged in to account.
 * @host /profile/notifications/
 * @headers Authorization token with a JWT prefix
 * @param authToken
 * @returns an api response with a status response along with either data object or an error string
 */
export const getUserProfileNotifications = async ({
  authToken,
}: {
  authToken: string;
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/profile/notifications/", {
    method: "GET",
    headers: {
      Authorization: `JWT ${authToken}`,
    },
  });
  if (response.status !== 200) {
    return {
      ok: false,
      status: response.status,
      error: (response as ApiResponseType).error,
    };
  }

  const data = (await response.json()) as {
    notifications: UserProfileType["notifications"];
  };
  return {
    ok: true,
    status: response.status,
    data,
  };
};

/**
 * Add a notification to a user from within own account.
 * Must be logged in to account.
 * @host /profile/notifications/
 * @headers Authorization token with a JWT prefix
 * @param authToken
 * @param message
 * @returns an api response with a status response along with either data object or an error string
 */
export const addUserProfileNotification = async ({
  authToken,
  message,
}: {
  authToken: string;
  message: string;
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/profile/notifications/", {
    method: "POST",
    headers: {
      Authorization: `JWT ${authToken}`,
    },
    body: {
      message,
    },
  });

  if (response.status !== 201) {
    return {
      ok: false,
      status: response.status,
      error: (response as ApiResponseType).error,
    };
  }

  const data = (await response.json()) as {
    notifications: UserProfileType["notifications"];
  };
  return {
    ok: true,
    status: response.status,
    data,
  };
};

/**
 * Change a notification's is_read value to true.
 * Must be logged in to account.
 * @host /profile/notifications/
 * @headers Authorization token with a JWT prefix
 * @param authToken
 * @param creation_date
 * @returns an api response with a status response along with either data object or an error string
 */
export const setUserProfileNotificationToRead = async ({
  authToken,
  creation_date,
}: {
  authToken: string;
  creation_date: string;
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/profile/notifications/", {
    method: "PATCH",
    headers: {
      Authorization: `JWT ${authToken}`,
    },
    body: {
      creation_date,
    },
  });

  if (response.status !== 200) {
    return {
      ok: false,
      status: response.status,
      error: (response as ApiResponseType).error,
    };
  }

  const data = (await response.json()) as {
    notifications: UserProfileType["notifications"];
  };
  return {
    ok: true,
    status: response.status,
    data,
  };
};

/**
 * Delete a notifications from a profile for a user.
 * Must be logged in to account.
 * @host /profile/notifications/
 * @headers Authorization token with a JWT prefix
 * @param authToken
 * @returns an api response with a status response along with either data object or an error string
 */
export const removeUserProfileNotification = async ({
  authToken,
  creation_date,
}: {
  authToken: string;
  creation_date: string;
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/profile/notifications/", {
    method: "DELETE",
    headers: {
      Authorization: `JWT ${authToken}`,
    },
    body: {
      creation_date,
    },
  });

  if (response.status !== 200) {
    return {
      ok: false,
      status: response.status,
      error: (response as ApiResponseType).error,
    };
  }

  const data = (await response.json()) as {
    notifications: UserProfileType["notifications"];
  };

  return {
    ok: true,
    status: response.status,
    data,
  };
};

/**
 * Set the saved items for a user.
 * @host /profile/saved_items/
 * @headers Authorization token with a JWT prefix
 * @param authToken
 * @returns an api response with a status response along with either data object or an error string
 */
export const setUserSavedItems = async ({
  authToken,
  saved_items,
}: {
  authToken: string;
  saved_items: number[];
}): Promise<ApiResponseType> => {
  const response = await fetchWithHeaders("/profile/saved_items/", {
    method: "POST",
    headers: {
      Authorization: `JWT ${authToken}`,
    },
    body: {
      saved_items,
    },
  });
  if (response.status !== 200) {
    return {
      ok: false,
      status: response.status,
      error: (response as ApiResponseType).error,
    };
  }

  const data = (await response.json()) as {
    saved_items: UserProfileType["saved_items"];
  };
  return {
    ok: true,
    status: response.status,
    data,
  };
};
