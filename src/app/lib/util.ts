// import { signOut as userSignOut } from "@/state/services/userSlice";
// import store from "@/state/store";
import userApi from "../api/controller/userApi";
import { UserSignInRequest } from "../api/types/api-requests";
import paths from "../router/paths";
import { STORAGE_KEYS } from "./constants";

/**
 * Remove the access and refresh tokens from local storage
 */
export const signOut = async () => {
  // const dispatch = store.dispatch;
  // Remove the access and refresh token from local storage
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  window.location.href = "/" + paths.home;
  // Dispatch the signOut action to update the Redux store
  // dispatch(userSignOut());
};

/**
 * Sign in a user by calling the signIn api function storing the returned access and refresh tokens in local storage
 */
export const signIn = async ({ email, password }: UserSignInRequest) => {
  // Call the signIn api function
  const signInResponse = await userApi.signIn({
    email,
    password,
  });

  if (!signInResponse.a || !signInResponse.r) {
    console.log(signInResponse, "Sign in failed. Missing tokens in response.");
  }
  // Store the access and refresh tokens in local storage
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, signInResponse.a);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, signInResponse.r);
};
