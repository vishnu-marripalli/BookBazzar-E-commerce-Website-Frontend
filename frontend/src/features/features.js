import { createSlice } from "@reduxjs/toolkit";


const initialState ={

    hamburger : false,
    books : [
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
        },
        {
          _id: "64f8b1c72e3a4b7b8a2f7d9f",
          title: "Clean Code: A Handbook of Agile Software Craftsmanship",
          author: "Robert C. Martin",
          wishlist: false,
          genre: "Software Engineering",
          description:
            "A guide to producing readable, reusable, and refactorable software in Java.",
          mainImage: {
            url: "https://images-na.ssl-images-amazon.com/images/I/51b7XbfMIIL._SX374_BO1,204,203,200_.jpg",
            public_id: "book-images/clean-code",
            _id: "img223456",
          },
          condition: "New",
          language: "English",
          owner: "user223456",
          price: 30.99,
          stock: 10,
          subImages: [
            {
              url: "https://images-na.ssl-images-amazon.com/images/I/41-+JXUk83L._SX331_BO1,204,203,200_.jpg",
              public_id: "book-images/clean-code-back",
              _id: "img334567",
            },
          ],
          publishedDate: "2008-08-11",
          rating: {
            averageRating: 4.7,
            totalReviews: 220,
          },
          createdAt: "2024-09-02T12:00:00Z",
          updatedAt: "2024-09-02T12:00:00Z",
          __v: 0,
        },
        {
          _id: "64f8b1c72e3a4b7b8a2f7da0",
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          wishlist: false,
          genre: "Classic Literature",
          description:
            "A novel set in the Roaring Twenties that tells the story of the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.",
          mainImage: {
            url: "https://images-na.ssl-images-amazon.com/images/I/81xXAy1O0-L.jpg",
            public_id: "book-images/the-great-gatsby",
            _id: "img423456",
          },
          condition: "Used",
          language: "English",
          owner: "user323456",
          price: 10.99,
          stock: 15,
          subImages: [
            {
              url: "https://images-na.ssl-images-amazon.com/images/I/81rY8iKpH7L.jpg",
              public_id: "book-images/the-great-gatsby-back",
              _id: "img534567",
            },
          ],
          publishedDate: "1925-04-10",
          rating: {
            averageRating: 4.2,
            totalReviews: 500,
          },
          createdAt: "2024-09-03T12:00:00Z",
          updatedAt: "2024-09-03T12:00:00Z",
          __v: 0,
        },
        {
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
          _id: "64f8b1c72e3a4b7b8a2f7da2",
          title: "1984",
          author: "George Orwell",
          wishlist: false,
          genre: "Dystopian",
          description:
            "A novel that presents a dystopian future under a totalitarian regime.",
          mainImage: {
            url: "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0zfL.jpg",
            public_id: "book-images/1984",
            _id: "img823456",
          },
          condition: "Used",
          language: "English",
          owner: "user523456",
          price: 9.99,
          stock: 12,
          subImages: [
            {
              url: "https://images-na.ssl-images-amazon.com/images/I/81mtDLql+XL.jpg",
              public_id: "book-images/1984-back",
              _id: "img934567",
            },
          ],
          publishedDate: "1949-06-08",
          rating: {
            averageRating: 4.6,
            totalReviews: 450,
          },
          createdAt: "2024-09-05T12:00:00Z",
          updatedAt: "2024-09-05T12:00:00Z",
          __v: 0,
        },
        {
          _id: "64f8b1c72e3a4b7b8a2f7da3",
          title: "The Catcher in the Rye",
          author: "J.D. Salinger",
          wishlist: false,
          genre: "Classic Literature",
          description:
            "A story about adolescent Holden Caulfield's disillusionment with the adult world.",
          mainImage: {
            url: "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg",
            public_id: "book-images/the-catcher-in-the-rye",
            _id: "img1023456",
          },
          condition: "New",
          language: "English",
          owner: "user623456",
          price: 11.99,
          stock: 8,
          subImages: [
            {
              url: "https://images-na.ssl-images-amazon.com/images/I/71FtLeJ14fL.jpg",
              public_id: "book-images/the-catcher-in-the-rye-back",
              _id: "img1134567",
            },
          ],
          publishedDate: "1951-07-16",
          rating: {
            averageRating: 4.0,
            totalReviews: 380,
          },
          createdAt: "2024-09-06T12:00:00Z",
          updatedAt: "2024-09-06T12:00:00Z",
          __v: 0,
        },
        {
          _id: "64f8b1c72e3a4b7b8a2f7da4",
          title: "Pride and Prejudice",
          author: "Jane Austen",
          wishlist: false,
          genre: "Romance",
          description:
            "A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.",
          mainImage: {
            url: "https://images-na.ssl-images-amazon.com/images/I/81Q-6eJ4S-L.jpg",
            public_id: "book-images/pride-and-prejudice",
            _id: "img1223456",
          },
          condition: "Used",
          language: "English",
          owner: "user723456",
          price: 8.99,
          stock: 10,
          subImages: [
            {
              url: "https://images-na.ssl-images-amazon.com/images/I/71xblqP6hZL.jpg",
              public_id: "book-images/pride-and-prejudice-back",
              _id: "img1334567",
            },
          ],
          publishedDate: "1813-01-28",
          rating: {
            averageRating: 4.4,
            totalReviews: 410,
          },
          createdAt: "2024-09-07T12:00:00Z",
          updatedAt: "2024-09-07T12:00:00Z",
          __v: 0,
        },
        {
          _id: "64f8b1c72e3a4b7b8a2f7da5",
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          wishlist: false,
          genre: "Fantasy",
          description:
            "A fantasy novel and children's book by English author J.R.R. Tolkien. It was followed by The Lord of the Rings.",
          mainImage: {
            url: "https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg",
            public_id: "book-images/the-hobbit",
            _id: "img1423456",
          },
          condition: "New",
          language: "English",
          owner: "user823456",
          price: 14.99,
          stock: 7,
          subImages: [
            {
              url: "https://images-na.ssl-images-amazon.com/images/I/81t2CVWEsUL.jpg",
              public_id: "book-images/the-hobbit-back",
              _id: "img1534567",
            },
          ],
          publishedDate: "1937-09-21",
          rating: {
            averageRating: 4.9,
            totalReviews: 700,
          },
          createdAt: "2024-09-08T12:00:00Z",
          updatedAt: "2024-09-08T12:00:00Z",
          __v: 0,
        },
        {
          _id: "64f8b1c72e3a4b7b8a2f7da6",
          title: "Thinking, Fast and Slow",
          author: "Daniel Kahneman",
          wishlist: false,
          genre: "Psychology",
          description:
            "A best-selling book published during 2011 by Nobel laureate Daniel Kahneman.",
          mainImage: {
            url: "https://images-na.ssl-images-amazon.com/images/I/41SNp5f0FOL._SX331_BO1,204,203,200_.jpg",
            public_id: "book-images/thinking-fast-and-slow",
            _id: "img1623456",
          },
          condition: "Used",
          language: "English",
          owner: "user923456",
          price: 18.99,
          stock: 6,
          subImages: [
            {
              url: "https://images-na.ssl-images-amazon.com/images/I/71OCsjXC4DL.jpg",
              public_id: "book-images/thinking-fast-and-slow-back",
              _id: "img1734567",
            },
          ],
          publishedDate: "2011-10-25",
          rating: {
            averageRating: 4.3,
            totalReviews: 350,
          },
          createdAt: "2024-09-09T12:00:00Z",
          updatedAt: "2024-09-09T12:00:00Z",
          __v: 0,
        },
        {
          _id: "64f8b1c72e3a4b7b8a2f7da7",
          title: "The Art of Computer Programming, Volumes 1-4",
          author: "Donald E. Knuth",
          wishlist: false,
          genre: "Computer Science",
          description:
            "Considered the 'bible' of computer programming, covering many kinds of programming algorithms and their analysis.",
          mainImage: {
            url: "https://images-na.ssl-images-amazon.com/images/I/41+e3refnZL._SX342_SY445_QL70_ML2_.jpg",
            public_id: "book-images/the-art-of-computer-programming",
            _id: "img1823456",
          },
          condition: "New",
          language: "English",
          owner: "user1023456",
          price: 199.99,
          stock: 3,
          subImages: [
            {
              url: "https://images-na.ssl-images-amazon.com/images/I/51r6o8h0aFL.jpg",
              public_id: "book-images/the-art-of-computer-programming-back",
              _id: "img1934567",
            },
          ],
          publishedDate: "2011-03-09",
          rating: {
            averageRating: 4.9,
            totalReviews: 95,
          },
          createdAt: "2024-09-10T12:00:00Z",
          updatedAt: "2024-09-10T12:00:00Z",
          __v: 0,
        },
        {
          _id: "64f8b1c72e3a4b7b8a2f7da8",
          title: "Deep Work: Rules for Focused Success in a Distracted World",
          author: "Cal Newport",
          wishlist: false,
          genre: "Productivity",
          description:
            "An insightful book that teaches how to focus without distraction on a cognitively demanding task.",
          mainImage: {
            url: "https://images-na.ssl-images-amazon.com/images/I/41bY6oI1p3L._SX331_BO1,204,203,200_.jpg",
            public_id: "book-images/deep-work",
            _id: "img2023456",
          },
          condition: "New",
          language: "English",
          owner: "user1123456",
          price: 16.99,
          stock: 9,
          subImages: [
            {
              url: "https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg",
              public_id: "book-images/deep-work-back",
              _id: "img2134567",
            },
          ],
          publishedDate: "2016-01-05",
          rating: {
            averageRating: 4.5,
            totalReviews: 260,
          },
          createdAt: "2024-09-11T12:00:00Z",
          updatedAt: "2024-09-11T12:00:00Z",
          __v: 0,
        },
      ]
      

}


const featureSlice = createSlice({
    name:'features',
    initialState,
    reducers:{
        toggleHamburger(state){
            state.hamburger = !state.hamburger;
        }

    }

});

export const {toggleHamburger} = featureSlice.actions;
export default featureSlice.reducer;
