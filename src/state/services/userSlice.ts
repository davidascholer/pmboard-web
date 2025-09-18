import { UserProfileType } from "@/shared/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserProfileType & { signedIn: boolean } = {
  id: "",
  name: "",
  email: "",
  settings: null,
  createdAt: "",
  updatedAt: "",
  isActive: false,
  membership: {
    status: "FREE",
    startedAt: "",
    endsAt: "",
  },
  nextMembership: null,
  projectsOwned: [],
  projectsJoined: [],
  // notifications: [],
  signedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const user = action.payload.user;
      state.id = user.id;
      state.email = user.email;
      state.name = user.name;
      state.settings = user.settings;
      state.createdAt = user.createdAt;
      state.updatedAt = user.updatedAt;
      state.isActive = user.isActive;
      state.membership = user.membership;
      state.nextMembership = user.nextMembership;
      state.projectsOwned = user.projectsOwned;
      state.projectsJoined = user.projectsJoined;
      // state.notifications = user.notifications;
      state.signedIn = true;
    },
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserUpdatedAt: (state, action) => {
      state.updatedAt = action.payload;
    },
    setUserMembership: (state, action) => {
      state.membership = action.payload;
    },
    setUserNextMembership: (state, action) => {
      state.nextMembership = action.payload;
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
      state.id = initialState.id;
      state.email = initialState.email;
      state.name = initialState.name;
      state.settings = initialState.settings;
      state.createdAt = initialState.createdAt;
      state.updatedAt = initialState.updatedAt;
      state.isActive = initialState.isActive;
      state.membership = initialState.membership;
      state.nextMembership = initialState.nextMembership;
      state.projectsOwned = initialState.projectsOwned;
      state.projectsJoined = initialState.projectsJoined;
      // state.notifications = initialState.notifications;
      state.signedIn = initialState.signedIn;
    },
  },
});

export const {
  setUserDetails,
  setUserName,
  setUserUpdatedAt,
  setUserMembership,
  setUserNextMembership,
  setUserProjectsOwned,
  setUserProjectsJoined,
  // setUserNotifications,
  replaceUserSettings,
  signOut,
} = userSlice.actions;

export default userSlice.reducer;
