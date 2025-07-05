import { UserProfileType } from "@/shared/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserProfileType & { signedIn: boolean } = {
  id: -1,
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  address: "",
  birth_date: "",
  profile_picture_url: "",
  last_visit: "",
  date_joined: "",
  settings: {
    theme: "light",
  },
  notifications: [],
  saved_items: [],
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
      state.first_name = user.first_name;
      state.last_name = user.last_name;
      state.phone = user.phone;
      state.address = user.address;
      state.birth_date = user.birth_date;
      state.profile_picture_url = user.profile_picture_url;
      state.last_visit = user.last_visit;
      state.date_joined = user.date_joined;
      state.settings = user.settings;
      state.notifications = user.notifications;
      state.saved_items = user.saved_items;
      state.signedIn = true;
    },
    setUserFirstName: (state, action) => {
      state.first_name = action.payload;
    },
    setUserLastName: (state, action) => {
      state.last_name = action.payload;
    },
    setUserPhone: (state, action) => {
      state.phone = action.payload;
    },
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
    setUserBirthDate: (state, action) => {
      state.birth_date = action.payload;
    },
    setUserProfilePictureUrl: (state, action) => {
      state.profile_picture_url = action.payload;
    },
    setUserNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    replaceUserSettings: (state, action) => {
      state.settings = action.payload;
    },
    setUserSettingsTheme: (state, action) => {
      state.settings.theme = action.payload;
    },
    setStateSavedItems: (state, action) => {
      state.saved_items = action.payload;
    },
    signOut: (state) => {
      state.id = initialState.id;
      state.email = initialState.email;
      state.first_name = initialState.first_name;
      state.last_name = initialState.last_name;
      state.phone = initialState.phone;
      state.address = initialState.address;
      state.birth_date = initialState.birth_date;
      state.profile_picture_url = initialState.profile_picture_url;
      state.last_visit = initialState.last_visit;
      state.date_joined = initialState.date_joined;
      state.settings = initialState.settings;
      state.notifications = initialState.notifications;
      state.saved_items = initialState.saved_items;
      state.signedIn = initialState.signedIn;
    },
  },
});

export const {
  setUserDetails,
  setUserFirstName,
  setUserLastName,
  setUserPhone,
  setUserAddress,
  setUserBirthDate,
  setUserProfilePictureUrl,
  setUserNotifications,
  replaceUserSettings,
  setUserSettingsTheme,
  setStateSavedItems,
  signOut,
} = userSlice.actions;

export default userSlice.reducer;
