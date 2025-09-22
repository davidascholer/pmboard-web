// import { signOut as userSignOut } from "@/state/services/userSlice";
// import store from "@/state/store";
import { ApiResponseType } from "@/shared/types";
import userApi from "../api/controller/userApi";
import { UserSignInRequest } from "../api/types/api-requests";
import store from "@/state/store";
import { initialState, setLoginUserData } from "@/state/services/userSlice";
import { authApi } from "../api/controller/authApi";

/**
 * Sign in a user by calling the signIn api function storing the returned access and refresh tokens in local storage
 */
export const signIn = async ({ email, password }: UserSignInRequest) => {
  try {
    const response: ApiResponseType = await userApi.signIn({
      email: email,
      password: password,
    });
    if (!response.ok) {
      return response.status;
    }

    store.dispatch(setLoginUserData(response.data));
    return response.status;
  } catch (error) {
    console.error("Error during sign in:", error);
  }
};

/**
 * Sign out on server by clearing the httpOnly cookie
 */
export const signOut = async () => {
  try {
    const response: ApiResponseType = await authApi.signOutOnServer();
    if (!response.ok) {
      return response.status;
    }

    store.dispatch(setLoginUserData(initialState));
    return response.status;
  } catch (error) {
    console.error("Error during sign out:", error);
  }
};
