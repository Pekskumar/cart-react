import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";

const Store = configureStore({
  reducer: {
    GlobalShowProduct: ProductSlice,
  },
});
export default Store;
