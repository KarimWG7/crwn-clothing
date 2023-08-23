//NOTE: need to Change
import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import { persistReducer, persistStore } from "redux-persist";
import { loggerMiddleware } from "./middleware/logger";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
// const middleWares = [
//   process.env.NODE_ENV === "development" && loggerMiddleware,
// ].filter(Boolean);
// const composedEnhancers = compose(applyMiddleware(...middleWares));
// export const store = createStore(
//   persistedReducer,
//   undefined,
//   composedEnhancers
// );

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);