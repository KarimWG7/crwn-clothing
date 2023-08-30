import { createSelector } from "reselect";
// NOTE: this function take two arguments the first is an array of inputs and the the second is the output slector
const selectCategoryReducer = (state) => state.categories;

export const selectCategories1 = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

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
export const selectCategoriesMap = createSelector(
  [selectCategories1],
  (categories) => categories
  );
  export const selectCategoriesIsLoading  = createSelector (
    [selectCategoryReducer], 
    (categoriesSlice) => categoriesSlice.isLoading
  )

  //NOTE: this was the previuos function to select the categories map from the fire store db which was called to select it from fire store every time
  
  
  // export const selectCategories = (state) => {
    //   console.log("selector was fired");
    
    //   return state.categories.categories.reduce((acc, category) => {
  //     const { title, items } = category;
  //     acc[title.toLowerCase()] = items;
  //     return acc;
  //   }, {});
  // };
  
  // export const selectCategoriesMap = (state) => state.categories.categories;