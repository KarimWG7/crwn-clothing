import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";

import { loggerMiddleware } from "./middleware/logger";
const middlewares = [
  process.env.NODE_ENV === "development" && loggerMiddleware,
].filter(Boolean);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

// import {
//   compose,
//   applyMiddleware,
//   legacy_createStore as createStore,
// } from "redux";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["user"],
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const composedEnhancers = compose(applyMiddleware(...middleWares));
// export const store = createStore(
//   persistedReducer,
//   undefined,
//   composedEnhancers
// );
// export const persistor = persistStore(store);

// export const store = createStore(persistedReducer);
