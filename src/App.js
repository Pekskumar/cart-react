import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AccountPage from "./Pages/AccountPage";
import CartPage from "./Pages/CartPage";
import Dashboard from "./Pages/Dashboard";
import ProductDetail from "./Pages/ProductDetail";
import Products from "./Pages/Products";
import SuccessPaymentPage from "./Pages/SuccessPaymentPage";
import Wishlist from "./Pages/Wishlist";
import Category from "./Pages/Category";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <>
        <Header />
        <Routes>
          {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/successpayment" element={<SuccessPaymentPage />} />
          <Route path="/category" element={<Category />} />
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </>
    </Router>
  );
}

export default App;
