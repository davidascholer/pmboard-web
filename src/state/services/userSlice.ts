import { UserProfileType } from "@/shared/types";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: UserProfileType & { authToken: string; signedIn: boolean } =
  {
    name: "",
    email: "",
    settings: null,
    createdAt: "",
    membership: {
      status: "FREE",
      startedAt: "",
      endsAt: "",
    },
    projectsOwned: [],
    projectsJoined: [],
    // notifications: [],
    authToken: "",
    signedIn: false,
  };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginUserData: (state, action) => {
      console.log("Setting user data in slice:", action.payload);
      const userData = action.payload;
      state.email = userData.email;
      state.name = userData.name;
      state.settings = userData.settings;
      state.createdAt = userData.createdAt;
      state.membership = userData.membership;
      state.projectsOwned = userData.projectsOwned;
      state.projectsJoined = userData.projectsJoined;
      // state.notifications = userData.notifications;
      state.signedIn = true;
      state.authToken = userData.a;
    },
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserMembership: (state, action) => {
      state.membership = action.payload;
    },
    setUserProjectsOwned: (state, action) => {
      state.projectsOwned = action.payload;
    },
    setUserProjectsJoined: (state, action) => {
      state.projectsJoined = action.payload;
    },
    // setUserNotifications: (state, action) => {
    //   state.notifications = action.payload;
    // },
    replaceUserSettings: (state, action) => {
      state.settings = action.payload;
    },
    signOut: (state) => {
      state.email = initialState.email;
      state.name = initialState.name;
      state.settings = initialState.settings;
      state.createdAt = initialState.createdAt;
      state.membership = initialState.membership;
      state.projectsOwned = initialState.projectsOwned;
      state.projectsJoined = initialState.projectsJoined;
      // state.notifications = initialState.notifications;
      state.authToken = initialState.authToken;
      state.signedIn = initialState.signedIn;
    },
  },
});

export const {
  setLoginUserData,
  setUserName,
  setUserMembership,
  setUserProjectsOwned,
  setUserProjectsJoined,
  // setUserNotifications,
  replaceUserSettings,
  signOut,
} = userSlice.actions;

export default userSlice.reducer;

/*
{
    "id": "acdf5e0b-e542-47e9-8948-3b39a48bc3a7",
    "name": "Test User",
    "email": "testuser1@test.com",
    "settings": {
        "background": "default"
    },
    "createdAt": "2025-09-12T22:00:38.576Z",
    "updatedAt": "2025-09-12T22:01:07.355Z",
    "isActive": true,
    "membership": {
        "status": "FREE",
        "startedAt": "2025-09-12T22:00:38.576Z",
        "endsAt": null
    },
    "nextMembership": null,
    "projectsOwned": [],
    "projectsJoined": [],
    "a": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyMUB0ZXN0LmNvbSIsInRva2VuVHlwZSI6ImFjY2VzcyIsImlkIjoiYWNkZjVlMGItZTU0Mi00N2U5LTg5NDgtM2IzOWE0OGJjM2E3IiwiaWF0IjoxNzU4NDMwMjA0LCJleHAiOjE3NTg0MzM4MDR9.2gnJfT_SDw7yC2uQpdKlt6s8OWLs4tHLEz4U_zJCCls",
    "r": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyMUB0ZXN0LmNvbSIsInRva2VuVHlwZSI6InJlZnJlc2giLCJpZCI6ImFjZGY1ZTBiLWU1NDItNDdlOS04OTQ4LTNiMzlhNDhiYzNhNyIsImlhdCI6MTc1ODQzMDIwNCwiZXhwIjoxNzYxMDIyMjA0fQ.VvCpZe-gVEOJdt5fJpdrq-rpQtg1n_hBd6mxPZlMisM"
}
*/
