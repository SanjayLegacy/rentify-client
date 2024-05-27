import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers, Reducer } from "redux";
import userReducer from "./reducer/userReducer";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import { authApi } from "../services/authApi";
import { propertyApi } from "../services/propertyApi";
import { allApis } from "../services/allApis";

const reducers = combineReducers({
  [allApis.reducerPath]: allApis.reducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  whitelist: ["user"],
  storage,
  transforms: [
    encryptTransform({
      secretKey: "rentifyApplicationKey",
    }),
  ],
};

const rootReducer: Reducer = (state: RootState, action: any) => {
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(allApis.middleware)
      .concat(authApi.middleware)
      .concat(propertyApi.middleware);

    return middlewares;
  },
});

const persistor = persistStore(store);
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
