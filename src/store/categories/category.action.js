import { createAction } from "../../utils/reducer.utils";
import { CATEGORY_ACTIONS_TYPES } from "./category.types";

export const setCategoriesMap = (categories) => {
  return createAction(CATEGORY_ACTIONS_TYPES.SET_CATEGORIES_MAP, categories);
};
