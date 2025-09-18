import { useEffect } from "react";
// import { signOut } from "../utils";
// import { getSetUserData, verifyUserSession } from "@/app/api/lib/util";

/**
 * Verify the user session whenever the tab is focused or mounted.
 * This is useful for ensuring that the user is still signed in when they return to the tab
 * after navigating away or when the app is mounted. If the user is not signed in, it will
 * sign them out by resetting the user state to default.
 */
const useSignInOnFocus = () => {
  useEffect(() => {
    // // Run every time tab is mounted or focused
    // const handleFocus = async () => {
    //   try {
    //     // Verify the user session by checking if either the access or refresh tokens are valid
    //     const verifySession = await verifyUserSession();
    //     if (!verifySession.ok) {
    //       // If the token is invalid, sign out the user
    //       signOut();
    //       return;
    //     }
    //     // If the token is valid, check the user session
    //     const setUserData = await getSetUserData();
    //     if (!setUserData.ok) throw new Error("Failed to fetch user data");

    //     return;
    //   } catch (error) {
    //     // Handle any unexpected errors
    //     console.error("Error verifying user session on focus:", error);
    //   }
    // };

    // handleFocus(); // Call the function immediately to handle the initial focus

    // // Add the event listener
    // window.addEventListener("focus", handleFocus);

    // Clean up the event listener when the component unmounts or the dependency changes
    return () => {
      // window.removeEventListener("focus", handleFocus);
    };
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount
};

export default useSignInOnFocus;
