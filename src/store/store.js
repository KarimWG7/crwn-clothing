import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import { persistReducer, persistStore } from "redux-persist";
import { loggerMiddleware } from "./middleware/logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

const persistConfig = {
  key: "root",
  storage,
  blacklist : ["categories", "user"],
};
const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleWares = [
  process.env.NODE_ENV === "development" && loggerMiddleware,
  // thunk,
  sagaMiddleware
].filter(Boolean);
const composedEnhancers = compose(applyMiddleware(...middleWares));
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
sagaMiddleware.run(rootSaga)
// export const store = createStore(persistedReducer);

export const persistor = persistStore(store);

// NOTE: all the middlewares in redux are structured in that way
/* 
const middleware = (store) => (next) => (action) => {
  // some logic
}
const middleware = (store) => {
  return (next) => {
    return (action) =>{

    }
  }
}
 - so it's a function which has a parameter of store that have a function which have a parameter of next thet have a funvtion which have an action parameter
 - it's a functions that returns a function that return a function

*/
