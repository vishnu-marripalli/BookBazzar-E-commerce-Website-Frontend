import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    cart: [ {
      _id: "64f8b1c72e3a4b7b8a2f7da1",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      wishlist: false,
      genre: "Classic Literature",
      description:
        "A novel of warmth and humor, despite dealing with serious issues of rape and racial inequality.",
      mainImage: {
        url: "https://images-na.ssl-images-amazon.com/images/I/81gepf1eMqL.jpg",
        public_id: "book-images/to-kill-a-mockingbird",
        _id: "img623456",
      },
      condition: "New",
      language: "English",
      owner: "user423456",
      price: 12.99,
      stock: 20,
      subImages: [
        {
          url: "https://images-na.ssl-images-amazon.com/images/I/71FxgtFKcQL.jpg",
          public_id: "book-images/to-kill-a-mockingbird-back",
          _id: "img734567",
        },
      ],
      publishedDate: "1960-07-11",
      rating: {
        averageRating: 4.8,
        totalReviews: 600,
      },
      createdAt: "2024-09-04T12:00:00Z",
      updatedAt: "2024-09-04T12:00:00Z",
      __v: 0,
    },
    {
      _id: "64f8b1c72e3a4b7b8a2f7d9e",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      wishlist: false,
      genre: "Computer Science",
      description:
        "A comprehensive book on algorithms that covers a wide range of topics in computer science, including data structures, graph algorithms, and advanced algorithmic techniques.",
      mainImage: {
        url: "https://images-na.ssl-images-amazon.com/images/I/41SZ3A2VTTL._SX379_BO1,204,203,200_.jpg",
        public_id: "book-images/intro-to-algorithms",
        _id: "img123456",
      },
      condition: "Used",
      language: "English",
      owner: "user123456",
      price: 25.99,
      stock: 5,
      subImages: [
        {
          url: "https://images-na.ssl-images-amazon.com/images/I/51dYwG53DkL._SX379_BO1,204,203,200_.jpg",
          public_id: "book-images/intro-to-algorithms-back",
          _id: "img234567",
        },
        {
          url: "https://images-na.ssl-images-amazon.com/images/I/51GDy3t0F8L._SX379_BO1,204,203,200_.jpg",
          public_id: "book-images/intro-to-algorithms-inside",
          _id: "img345678",
        },
      ],
      publishedDate: "2009-07-31",
      rating: {
        averageRating: 4.5,
        totalReviews: 128,
      },
      createdAt: "2024-09-01T12:00:00Z",
      updatedAt: "2024-09-01T12:00:00Z",
      __v: 0,
    },],
    totalPrice: 0,
    discountedTotalPrice: 0,
}

const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {
      setCart: (state, action) => {
        // console.log(action.payload)
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