import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    cart: [ ],
    totalPrice: 0,
    discountedTotalPrice: 0,
}

const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {
      setCart: (state, action) => {
        state.cart = action.payload.cart;
        state.totalPrice = action.payload.totalPrice;
        state.discountedTotalPrice = action.payload.discountedTotalPrice;
      },
      // Add other reducers as needed (e.g., for updating user profile, email verification status, etc.)
      initCart: (state) => {
        Object.assign(state, initialState);
      },
    },
  });
  
  // Export actions and reducer
  export const { setCart, initCart } = cartReducer.actions;
  export default cartReducer.reducer;