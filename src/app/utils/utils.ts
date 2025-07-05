import { DOMAIN } from "@/shared/constants";
import { signOut as userSignOut } from "@/state/services/userSlice";
import store from "@/state/store";

/**
 * Remove the access and refresh tokens from local storage
 */
export const signOut = async () => {
  const dispatch = store.dispatch;
  // Remove the access and refresh token from local storage
  localStorage.removeItem(DOMAIN + "-rt");
  localStorage.removeItem(DOMAIN + "-at");
  // Dispatch the signOut action to update the Redux store
  dispatch(userSignOut());
};
