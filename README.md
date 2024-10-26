# 📚 BookBazaar

**BookBazaar** is an online marketplace and community for book enthusiasts to explore, buy, and sell books of various genres. Built with a modern tech stack, this project provides an intuitive user interface and robust backend functionality to support a seamless e-commerce experience. It also includes various admin and user features like individual admin panels

---

## 🚀 Project Overview

BookBazaar is designed to meet the needs of avid readers, collectors, and bookstores by providing a platform to discover books across genres. The platform supports categories like fiction, non-fiction, textbooks, and science, and allows users to upload, manage, and categorize books effectively. The platform’s scalable design supports multiple client subscriptions and provides analytics to track book sales and user engagement.

---

## 🌟 Key Features

### 1. **User and Admin Management**
   - **User Profiles**: Users can register, manage their profiles, and update personal information.
   - **Admin Panel**: Each client has an individual admin panel.

### 2. **E-commerce Functionalities**
   - **Book Management**: Users can upload book details, including images, descriptions, categories, and prices.
   - **Dynamic Table for Book Listing**: Includes functionalities like sorting, filtering, pagination, and inline editing of table rows.
   - **Cart System**: Integrated with MongoDB aggregation pipelines to fetch cart data, apply coupon discounts, and manage product information.

### 3. **Payment Integration**
   - **Razorpay Payment Integration**: Supports payments including creating orders and verifying payments. Features error handling and refund management.
   

### 4. **Authentication and Authorization**
   - **SSO Login with Passport**: Single Sign-On (SSO) with Passport enables secure and simplified authentication.
   - **JWT-based Authorization**: Used to protect routes and manage sessions securely for users and admins.

### 5. **Responsive Design & UI Components**
   - **Responsive UI**: The platform is fully responsive, with a mobile-friendly design for components like the table, search bar, and other interactive elements.
   - **Custom Search Bar with Filtering**: Allows users to search books or categories with a sleek custom search icon.
   
   - **Toasts for User Feedback**: Success and error toasts provide real-time feedback for actions like adding books, profile updates, and subscription purchases.

---

## 🛠️ Tech Stack

### **Frontend**
- **React**: Core framework for building interactive user interfaces.
- **Redux**: Used for managing global state, especially user login details.
- **React-Select**: Integrated custom search functionality for filtering books by categories.
- **TailwindCSS**: Streamlined the styling process with utility-first classes.
- **@table-library/react-table-library** & **@emotion/react**: Utilized for a dynamic, responsive table component.

### **Backend**
- **Node.js & Express**: Primary server and API management for handling requests and integrating middleware.
- **MongoDB & Mongoose**: Primary database for storing user data, books, and cart details.
- **Razorpay SDK**: Integrated for handling subscription payments and transaction verifications.
- **Passport**: Authentication middleware used for SSO functionality.

### **Other Dependencies**
   - **bcrypt**: For password hashing and secure storage.
   - **cloudinary & multer**: Used for image upload and management.
   - **jsonwebtoken (JWT)**: For secure route protection.
   - **passport-google-oauth20**: For Google OAuth integration.
   - **express-validator**: For request data validation.
  

---

## 📋 Project Structure

- **Frontend**: Located in the `src` folder, with organized directories for components, pages, and services (e.g., `apiService.js`).
- **Backend**: Includes separate folders for `controllers`, `routes`, `models`, and `middleware`.


---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js and npm
- MongoDB and MySQL databases
- Razorpay Account for payment setup
- Cloudinary Account for image handling

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/bookbazaar.git
   cd bookbazaar
2. **Install Dependencies**
   ```bash
   npm install
3. **Set Up Environment Variables**

   - Create a .env file with necessary environment variables such as:
    - MONGO_URI for MongoDB
    - MYSQL_DB credentials for MySQL
    - RAZORPAY_KEY_ID and RAZORPAY_SECRET
    - JWT_SECRET for authentication
4. **Run the Development Server**
   ```bash
   npm run dev
## 🖥️ Use Cases

### End Users
- **Browse and Search for Books**: Users can search, filter, and view details of books across different categories.
- **Purchase Books**: Users can select a Book, process payments through Razorpay, and access get book.
- **Manage Cart**: Users can add books to the cart, apply discounts, and proceed to checkout.

### Admins
- **Manage Book Listings**: Admins can add, update, or delete books in their individual panels.
- **Monitor Payments**: Each admin can view current usage and limits based on their Payments.


---

## 🎯 Future Improvements
- **Add Reviews and Ratings**: Enable users to review and rate books, enhancing user engagement.
- **Enhanced Search with Autocomplete**: Implement an advanced search bar that suggests books or categories based on input.
- **Real-time Notifications**: Notify users of new books, deals, and subscription expirations.

---

## 📞 Contact
If you have any questions or need support, please reach out to us via the **Contact Us** form on the website or mail me at marripallivishnuvardhan@gmail.com.

 