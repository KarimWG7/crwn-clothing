//NOTE: need to Change
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
// import SHOP_DATA from "../../shop-data";

import { setCategories } from "../../store/categories/category.reducer";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

const Shop = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      setIsLoading(true)
      const categoriesArray = await getCategoriesAndDocuments("categories");
      setIsLoading(false)
      dispatch(setCategories(categoriesArray));

      // dispatch(setCategories(SHOP_DATA));
    };

    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview isLoading={isLoading}/>} />
      <Route path=":category" element={<Category isLoading={isLoading}/>} />
    </Routes>
  );
};

export default Shop;
