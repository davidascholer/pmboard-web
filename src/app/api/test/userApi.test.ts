import { beforeAll, describe, expect, test } from "vitest";
import {
  fetchAuthTokens,
  getUserSettings,
  setUserSettings,
} from "../controller/userApi";
import { TEST_CLIENT_EMAIL, TEST_PASSWORD } from "./constants";
import { UserProfileType } from "@/shared/types";

/* Run this locally and independently only */
// describe.only("User sign up", () => {
//   test("User sign up", async () => {
//     // Try to sign up (return 400 if user already exists)
//     const response = await fetch("http://localhost:8000/auth/users/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: "test@test.com",
//         domain: DOMAIN,
//         password: "testpassword",
//         password2: "testpassword",
//       }),
//     });
//     expect(response.status).toBeOneOf([201, 400]);
//   });
// });

/* Run this locally and independently only */
// describe.only("Send an activation email", () => {
//   test("Send an activation email", async () => {
//     // Try to sign up (return 400 if user already exists)
//     const response = await fetch("http://localhost:8000/mfa/send_mfa_token/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: "test@test.com",
//         domain: DOMAIN,
//       }),
//     });
//     expect(response.status).toBe(200);
//   });
// });

/* Run this locally and independently only */
// describe.only("Activate user", () => {
//   test("Activate user", async () => {
//     // Try to sign up (return 400 if user already exists)
//     const response = await fetch(
//       "http://localhost:8000/profile/activate_user/",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           token: "smyxorvqxmavsourjmsyakocvf0lps",
//         }),
//       }
//     );
//     expect(response.status).toBe(200);
//   });
// });

/* Only use this if user activation does NOT require email validation */
// describe.only("User activation", () => {
//   test("User activation", async () => {
//     // Activate user without token check
//     const activateResponse = await fetch(
//       "http://localhost:8000/profile/activate_user_whitelist/",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: "test@test.com",
//           domain: DOMAIN,
//         }),
//       }
//     );
//     expect(activateResponse.status).toEqual(200);
//   });
// });

describe("User settings tests", () => {
  let accessToken = "";
  beforeAll(async () => {
    // Get token
    const tokenResponse = await fetchAuthTokens({
      email: TEST_CLIENT_EMAIL,
      password: TEST_PASSWORD,
    });
    expect(tokenResponse.status).toEqual(200);
    accessToken = tokenResponse.data?.access || "";
    expect(typeof tokenResponse.data?.access).toEqual("string");
  });

  test("Get the settings from the user.", async () => {
    const response = await getUserSettings({
      authToken: accessToken,
    });

    const data = response.data as {
      settings: UserProfileType["settings"];
    };

    console.log("data", data);

    expect(response.status).toBe(200);
    expect(data.settings).toBeDefined();
  });

  test("Set the entire settings to a user.", async () => {
    const response = await setUserSettings({
      authToken: accessToken,
      theme: "dark",
    });

    const data = response.data as {
      settings: UserProfileType["settings"];
    };

    expect(response.status).toBe(200);
    expect(data.settings).toBeDefined();
    expect(data.settings.theme).toBeDefined();
    expect(data.settings.theme).toBe("dark");
    expect(data.settings.theme).toBeOneOf(["light", "dark"]);
  });
});
