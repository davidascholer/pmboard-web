import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import { userSlice } from "./services/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Required for RTK Query caching functionality
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Default is 32ms. Change to 128ms
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }).concat(apiSlice.middleware),
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
