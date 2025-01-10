import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "root", storage };

const persistedReducer = persistReducer(persistConfig, studentReducer);

const store = configureStore({
  reducer: {
    students: persistedReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
