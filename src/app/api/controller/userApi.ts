import { ApiResponseType, UserAccountVerifyType } from "@/shared/types";
import { createApiCall } from "../lib/util";
import type {
  AuthSignInResponse,
  UserDetails,
  UserMembership,
} from "../types/api-responses";

// USER API CALLS
const userApi = {
  // Get authenticated user
  getAuth: createApiCall<UserDetails>("/users/auth", "GET"),

  /**
   * User sign in
   * @param data UserSignInRequest - { email: string, password: string }
   * @returns AuthSignInResponse - { a: string, r: string }
   */
  signIn: createApiCall<ApiResponseType & { data?: AuthSignInResponse }>(
    "/users/signin",
    "POST",
    false
  ),

  /**
   * User sign up
   * @param data UserSignUpRequest - { email: string, password: string, name: string }
   * @returns AuthSignUpResponse (User details with timestamps) if account activation is not required. No data otherwise.
   */
  //   signUp: createApiCall<ApiResponseType & { data?: AuthSignUpResponse }>(
  signUp: createApiCall<ApiResponseType>("/users/signup", "POST", false),

  /**
   * Update user password
   * @param data UpdateUserPasswordRequest - { email: string, newPassword: string, token: string }
   */
  updatePassword: createApiCall<ApiResponseType & { data?: null }>(
    "/users/update-password",
    "PATCH"
  ),

  /**
   * Activate user account
   * @param data UserActivateParams - { token: string }
   */
  activateAccount: createApiCall<
    ApiResponseType & { data?: UserAccountVerifyType }
  >("/users/activate", "PATCH", false),

  /**
   * Deactivate user account
   * @param data UserDeactivateParams - { token: string }
   */
  deactivateAccount: createApiCall<ApiResponseType & { data?: null }>(
    "/users/deactivate",
    "PATCH"
  ),

  /**
   * Delete user account
   * @param data UserDeleteRequest - { token: string }
   */
  deleteAccount: createApiCall<ApiResponseType & { data?: null }>(
    "/users/delete",
    "POST"
  ),

  /**
   * Update user settings
   * @param data UpdateUserSettingsRequest - { settings: object }
   */
  updateSettings: createApiCall<ApiResponseType & { data?: null }>(
    "/users/update-settings",
    "PATCH"
  ),

  // Verify and update membership
  verifyMembership: createApiCall<UserMembership>(
    "/users/verify-membership",
    "GET"
  ),

  // Update current membership
  updateMembership: createApiCall<ApiResponseType & { data?: null }>(
    "/users/update-membership",
    "PATCH"
  ),

  // Update next membership
  updateNextMembership: createApiCall<ApiResponseType & { data?: null }>(
    "/users/update-next-membership",
    "PATCH"
  ),
};

export default userApi;
