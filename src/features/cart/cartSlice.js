import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingCart = state.cartItems.findIndex(
        // cek apakah product sudah ada apa belum dalam cart
        (product) => product.id === newItem.id
      );
      if (existingCart !== -1) {
        state.cartItems[existingCart].qty += 1;
        state.cartItems[existingCart].totalPrice =
          state.cartItems[existingCart].qty * newItem.price;
      } else {
        state.cartItems.push({ ...newItem, qty: 1, totalPrice: newItem.price });
      }
    },
    removeItemFromCart: (state, action) => {
      const selectedProductIndex = state.cartItems.findIndex(
        (product) => product.id === action.payload.id
      );

      // kalau produk gaada
      if (selectedProductIndex === -1) return;

      // kalau quantity > 1 , quantity produk dikurang 1
      if (state.cartItems[selectedProductIndex].qty > 1) {
        state.cartItems[selectedProductIndex].qty -= 1;
        state.cartItems[selectedProductIndex].totalPrice =
          state.cartItems[selectedProductIndex].qty * action.payload.price;
      } else {
        state.cartItems.splice(selectedProductIndex, 1);
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

//selector
export const selectorCartItem = (state) => state.cart.cartItems;
export const selectorTotalCartItem = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.qty, 0);
export const selectorPriceCartItem = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.price, 0);
export default cartSlice;
