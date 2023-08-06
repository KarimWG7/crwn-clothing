import { combineReducers } from "redux";
import { userReucer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";

export const rootReducer = combineReducers({
  user: userReucer,
  categories: categoriesReducer,
});
