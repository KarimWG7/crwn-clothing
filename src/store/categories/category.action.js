//NOTE: need to Change
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import SHOP_DATA from "../../shop-data";
import { createAction } from "../../utils/reducer.utils";
import { CATEGORY_ACTIONS_TYPES } from "./category.types";

export const setCategories = (categoriesArray) => {
  return createAction(CATEGORY_ACTIONS_TYPES.SET_CATEGORIES, categoriesArray);
};
export const fetchCategoriesStart = () =>
  createAction(CATEGORY_ACTIONS_TYPES.FETCH_CATEGORIES_START);
export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(
    CATEGORY_ACTIONS_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );
export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORY_ACTIONS_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    // const categoriesArray = await getCategoriesAndDocuments("categories");
    // dispatch(fetchCategoriesSuccess(categoriesArray))
    dispatch(fetchCategoriesSuccess(SHOP_DATA)); 
  } catch (err) {
    dispatch(fetchCategoriesFailed(err));
  }
};
