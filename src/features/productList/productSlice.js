import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      console.log(action.payload);
    },
  },
});

export const selectProductItem = (state) => state.product.items;

export const { setProducts } = productSlice.actions;

export const selectorSortProductPriceDesc = (state) =>
  [...state.product.items].sort((a, b) => a.price - b.price);

export const selectorSortProductPriceAsc = (state) =>
  [...state.product.items].sort((a, b) => b.price - a.price);

export default productSlice;
