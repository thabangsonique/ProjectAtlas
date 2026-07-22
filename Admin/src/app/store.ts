// src/app/store.ts
import { api } from "../features/api.ts";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storageImport from "redux-persist/lib/storage";

const storage = (storageImport as any).default ?? storageImport;
import { globalSlice } from "../features/globalSlice";

// Import your slices
// import counterReducer from "../features/counter/counterSlice";
// import authReducer from "../features/auth/authSlice";
// import cartReducer from "../features/cart/cartSlice";

// Combine all reducers
const rootReducer = combineReducers({
  global: globalSlice.reducer,
  // counter: counterReducer,
  // auth: authReducer,
  // cart: cartReducer,
});

console.log("storage =", storage);
// Configure Redux Persist
const persistConfig = {
  key: "root",
  storage,

  // Persist only these slices
  whitelist: ["global"],

  // Or use blacklist instead
  // blacklist: ["products"],
};

// Wrap the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
