import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  GlobalShowProducts: localStorage.getItem("GlobalShowProducts")
    ? JSON.parse(localStorage.getItem("GlobalShowProducts"))
    : null,
  AddToCart: localStorage.getItem("AddToCart")
    ? JSON.parse(localStorage.getItem("AddToCart"))
    : null,
  Wishlist: localStorage.getItem("Wishlist")
    ? JSON.parse(localStorage.getItem("Wishlist"))
    : null,
};

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    GlobalShowProductsSlice: (state, actions) => {
      state.GlobalShowProducts = actions.payload;
      localStorage.setItem(
        "GlobalShowProducts",
        JSON.stringify(actions.payload)
      );
    },
    AddToCartSlice: (state, actions) => {
      state.AddToCart = actions.payload;
      localStorage.setItem("AddToCart", JSON.stringify(actions.payload));
    },
    WishListSlice: (state, actions) => {
      state.Wishlist = actions.payload;
      localStorage.setItem("Wishlist", JSON.stringify(actions.payload));
    },
  },
});

export const { GlobalShowProductsSlice, AddToCartSlice, WishListSlice } =
  ProductSlice.actions;
export default ProductSlice.reducer;
