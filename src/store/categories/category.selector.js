import { createSelector } from "reselect";




const selectCategoryReducer = (state) => state.categories;

//NOTE: this function take two arguments the first is an array of inputs and the the second is the output slector
export const selectCategories1 = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

//NOTE: this was the previuos function to select the categories map from the fire store db which was called to select it from fire store every time
// export const selectCatgories = (state) => {
//   console.log("selector was fired");
//   return state.categories.categories.reduce((acc, category) => {
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
// };

export const selectCategories = createSelector(
  [selectCategories1],
  (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
// export const selectCatgoriesMap = (state) => state.categories.categories;
export const selectCatgoriesMap = createSelector(
  [selectCategories1],
  (categories) => categories
);
