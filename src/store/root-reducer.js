import { combineReducers } from "redux";
import { userReucer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReucer,
});
