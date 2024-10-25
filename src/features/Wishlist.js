import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};

const wishlistReducer = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.books = action.payload;
    },
    initWishlist: (state) => {
      Object.assign(state, initialState);
    },
    // Add other reducers as needed (e.g., for updating user profile, email verification status, etc.)
  },
});

// Export actions and reducer
export const { setWishlist, initWishlist } = wishlistReducer.actions;
export default wishlistReducer.reducer;