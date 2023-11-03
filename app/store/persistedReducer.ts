import { combineReducers } from "@reduxjs/toolkit";
import { createMigrate, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterSlice from "./counter/slice";
import appSlice, { initialState as appInitialState } from "./app/slice";
import postsApi from "./postsApi";

const REDUX_STORE_VERSION = 1;

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const persistConfig = {
  key: "root",
  storage: typeof window !== "undefined" ? storage : createNoopStorage(),
  // If you'd like to persist an entire reducer, you can include the name here
  whitelist: [counterSlice.name],
  // If you'd like to not save a specific reducer, you can include it here to blacklist it or just leave it out from the persist config
  // If you'd like to only save specific parts of a reducer, you can create an individual persist config for the blacklisted reducer
  blacklist: [appSlice.name],
};

const appPersistConfig = {
  key: appSlice.name,
  storage,
  blacklist: ["initialized"],
  version: REDUX_STORE_VERSION,
  migrate: createMigrate({
    [REDUX_STORE_VERSION]: () => ({
      ...appInitialState,
      _persist: {
        rehydrated: false,
        version: REDUX_STORE_VERSION,
      },
    }),
  }),
};

const persistedReducers = {
  [counterSlice.name]: counterSlice.reducer,
  [appSlice.name]: persistReducer(appPersistConfig, appSlice.reducer),
};

const unpersistedReducers = {
  [postsApi.reducerPath]: postsApi.reducer,
};

const rootReducer = combineReducers({
  ...persistedReducers,
  ...unpersistedReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
