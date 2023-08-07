import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCatgories = (state) => {
  console.log("selector was fired");
  return state.categories.categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
};
export const selectCatgoriesMap = (state) => state.categories.categories;
