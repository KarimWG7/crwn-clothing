//NOTE: need to Change
import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import SHOP_DATA from "../../shop-data";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./category.action";
import { CATEGORY_ACTIONS_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    // const categoriesArray = yield call(getCategoriesAndDocuments);
    // yield put(fetchCategoriesSuccess(categoriesArray));
    yield put(fetchCategoriesSuccess(SHOP_DATA));
  } catch (err) {
    yield put(fetchCategoriesFailed(err));
  }
}
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORY_ACTIONS_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}
export function* categoriesSage() {
  yield all([call(onFetchCategories)]);
}
