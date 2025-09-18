import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./services/userSlice";
import { projectSlice } from "./services/projectSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    project: projectSlice.reducer,
  },
  // // Required for RTK Query caching functionality
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     // Default is 32ms. Change to 128ms
  //     immutableCheck: { warnAfter: 128 },
  //     serializableCheck: { warnAfter: 128 },
  //   }),
});

// Can still subscribe to the store
// store.subscribe(() => debug("store", JSON.stringify(store.getState())));

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export default store;
