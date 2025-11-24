import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignup from "./component/User/LoginSignUp";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "./App.css";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);


  // Disable right-click context menu
// window.addEventListener('contextmenu', event => event.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrderList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductReviews />
            </ProtectedRoute>
          }
        />

        {/* Stripe Payment Route */}
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        )}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;





// import React, { useEffect } from "react";
// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
// import store from "./store.jsx";
// import { loadUser } from "./actions/userAction.js";
// import Header from "./component/layout/Header/Header.jsx";
// import Footer from "./component/layout/Footer/Footer.jsx";
// import Home from "./component/Home/Home.jsx";
// import ProductDetails from "./component/Product/ProductDetails.jsx";
// import Products from "./component/Product/Products.jsx";
// import Search from "./component/Product/Search.jsx";
// import LoginSignup from "./component/User/LoginSignUp.jsx";
// import UserOptions from "./component/layout/Header/UserOptions.jsx";
// import Profile from "./component/User/Profile.jsx";
// import ProtectedRoute from "./component/Route/ProtectedRoute.jsx";
// import UpdateProfile from "./component/User/UpdateProfile.jsx";
// import UpdatePassword from "./component/User/UpdatePassword";
// import ForgotPassword from "./component/User/ForgotPassword";
// import ResetPassword from "./component/User/ResetPassword";
// import { ToastContainer } from "react-toastify";
// import Cart from "./component/Cart/Cart.jsx";
// import Shipping from "./component/Cart/Shipping.jsx";
// import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
// import axios from "axios";
// import { useState } from "react";
// import Payment from "./component/Cart/Payment.jsx";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import OrderSuccess from "./component/Cart/OrderSuccess.jsx";
// import MyOrders from "./component/Order/MyOrders.jsx";
// import OrderDetails from "./component/Order/OrderDetails.jsx";
// import Dashboard from "./component/Admin/Dashboard.jsx";
// import ProductList from "./component/Admin/ProductList.jsx";
// import NewProduct from "./component/Admin/NewProduct.jsx";
// import UpdateProduct from "./component/Admin/UpdateProduct.jsx";
// import OrderList from "./component/Admin/OrderList.jsx";
// import ProcessOrder from "./component/Admin/ProcessOrder.jsx";
// import UsersList from "./component/Admin/UsersList.jsx";
// import UpdateUser from "./component/Admin/UpdateUser.jsx";
// import ProductReviews from "./component/Admin/ProductReviews.jsx";
// import Contact from "./component/layout/Contact/Contact.jsx";
// import About from "./component/layout/About/About.jsx";
// import NotFound from "./component/layout/Not Found/NotFound.jsx";





// function App() {
//   const { isAuthenticated, user } = useSelector((state) => state.user);
//     const [stripeApiKey, setStripeApiKey] = useState("");
//      const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

//   async function getStripeApiKey() {
//     const { data } = await axios.get("/api/v1/stripeapikey");

//     setStripeApiKey(data.stripeApiKey);
//   }

//   useEffect(() => {
//     store.dispatch(loadUser());
//     getStripeApiKey();
//   }, []);

//   return (
//     <Router>
//       <Header />
//       {isAuthenticated && <UserOptions user={user} />}
//       <ToastContainer position="top-right" autoClose={2000} />
//       <Routes>
//         {/* Protected Routes */}
//         <Route
//           path="/account"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/me/update"
//           element={
//             <ProtectedRoute>
//               <UpdateProfile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/password/update"
//           element={
//             <ProtectedRoute>
//               <UpdatePassword />
//             </ProtectedRoute>
//           }
//         />
//        <Route
//           path="/shipping"
//           element={
//             <ProtectedRoute>
//               <Shipping />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/order/confirm"
//           element={
//             <ProtectedRoute>
//               <ConfirmOrder />
//             </ProtectedRoute>
//           }
//         />

//     {stripeApiKey && (
//           <Route path="/process/payment" element={
//             <ProtectedRoute>
//               <Elements stripe={stripePromise}>
//                 <Payment />
//               </Elements>
//             </ProtectedRoute>
//           } />
//         )}


//        <Route
//           path="/success"
//           element={
//             <ProtectedRoute>
//               <OrderSuccess />
//             </ProtectedRoute>
//           }
//         />

//        <Route
//           path="/orders"
//           element={
//             <ProtectedRoute>
//               <MyOrders />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/order/:id"
//           element={
//             <ProtectedRoute>
//               <OrderDetails />
//             </ProtectedRoute>
//           }
//         />

//           <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRoute isAdmin={true}>
//               < Dashboard/>
//             </ProtectedRoute>
//           }
//         />

//             <Route
//           path="/admin/products"
//           element={
//             <ProtectedRoute isAdmin={true}>
//               < ProductList/>
//             </ProtectedRoute>
//           }
//         />
//             <Route
//           path="/admin/product"
//           element={
//             <ProtectedRoute isAdmin={true}>
//               < NewProduct/>
//             </ProtectedRoute>
//           }
//         />

//             <Route
//           path="/admin/product/:id"
//           element={
//             <ProtectedRoute isAdmin={true}>
//               < UpdateProduct/>
//             </ProtectedRoute>
//           }
//         />


//             <Route
//           path="/admin/orders"
//           element={
//             <ProtectedRoute isAdmin={true}>
//               < OrderList/>
//             </ProtectedRoute>
//           }
//         />

//           <Route
//           path="/admin/order/:id"
//           element={
//             <ProtectedRoute isAdmin={true}>
//               < ProcessOrder/>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin/users"
//           element={
//             <ProtectedRoute isAdmin={true}>
//               < UsersList/>
//             </ProtectedRoute>
//           }
//         />

//          <Route
//           path="/admin/user/:id"
//           element={
//             <ProtectedRoute isAdmin={true}>
//               < UpdateUser/>
//             </ProtectedRoute>
//           }
//         />

// <Route
//           path="/admin/reviews"
//           element={
//             <ProtectedRoute isAdmin={true}>
//               < ProductReviews/>
//             </ProtectedRoute>
//           }
//         />


//         {/* Public Routes */}
//         <Route  path="/"                  element={<Home />} />
//         <Route  path="/product/:id"       element={<ProductDetails />} />
//         <Route  path="/products"          element={<Products />} />
//         <Route  path="/products/:keyword" element={<Products />} />
//         <Route  path="/search"            element={<Search />} />
//         <Route  path="/password/forgot"   element={<ForgotPassword />} />
//         <Route  path="/password/reset/:token" element={<ResetPassword />} />
//         <Route  path="/cart"              element={<Cart />} />
//         <Route  path="/login"             element={<LoginSignup />} />
//         <Route exact path="/contact" element={<Contact />} />
//         <Route exact path="/about" element={<About />} />
//         <Route path="*" element={<NotFound />} />

//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;