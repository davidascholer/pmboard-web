import { createApiCall } from "../lib/util";
import type {
  AuthSignInResponse,
  AuthSignUpResponse,
  UserDetails,
  UserMembership,
  ApiSuccess,
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
  signIn: createApiCall<AuthSignInResponse>("/users/signin", "POST", false),

  /**
   * User sign up
   * @param data UserSignUpRequest - { email: string, password: string, name: string }
   * @returns AuthSignUpResponse - User details with timestamps
   */
  signUp: createApiCall<AuthSignUpResponse>("/users/signup", "POST", false),

  /**
   * Update user password
   * @param data UpdateUserPasswordRequest - { email: string, newPassword: string, token: string }
   */
  updatePassword: createApiCall<ApiSuccess>(
    "/users/update-password",
    "PATCH"
  ),

  /**
   * Activate user account
   * @param data UserActivateParams - { token: string }
   */
  activateAccount: createApiCall<ApiSuccess>(
    "/users/activate",
    "PATCH",
    false
  ),

  /**
   * Deactivate user account
   * @param data UserDeactivateParams - { token: string }
   */
  deactivateAccount: createApiCall<ApiSuccess>(
    "/users/deactivate",
    "PATCH"
  ),

  /**
   * Delete user account
   * @param data UserDeleteRequest - { token: string }
   */
  deleteAccount: createApiCall<ApiSuccess>("/users/delete", "POST"),

  /**
   * Update user settings
   * @param data UpdateUserSettingsRequest - { settings: object }
   */
  updateSettings: createApiCall<ApiSuccess>("/users/update-settings", "PATCH"),

  // Verify and update membership
  verifyMembership: createApiCall<UserMembership>(
    "/users/verify-membership",
    "GET"
  ),

  // Update current membership
  updateMembership: createApiCall<ApiSuccess>(
    "/users/update-membership",
    "PATCH"
  ),

  // Update next membership
  updateNextMembership: createApiCall<ApiSuccess>(
    "/users/update-next-membership",
    "PATCH"
  ),
};

export default userApi;
