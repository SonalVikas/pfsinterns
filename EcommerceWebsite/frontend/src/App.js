import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector} from "react-redux";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Dashboard from "./component/Admin/Dashboard.js";
//import axios from "axios";
import Payment from "./component/Cart/Payment";
import {useState} from "react";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProductList from "./component/Admin/ProductList.js";
 import NewProduct from "./component/Admin/NewProduct";

import OrderList from "./component/Admin/OrderList";

import UsersList from "./component/Admin/UsersList";

import Contact from "./component/layout/Contact/Contact";
 import About from "./component/layout/About/About";


function App() {



  const { isAuthenticated, user } = useSelector((state) => state.user);


const [stripeApiKey, setStripeApiKey] = useState("");

async function getStripeApiKey() {
  try {
    const response = await fetch("/api/v1/stripeapikey");
    if (!response.ok) {
      throw new Error("Failed to fetch Stripe API key");
    }
    const data = await response.json();
    setStripeApiKey(data.stripeApiKey);
  } catch (error) {
    console.error("Error fetching Stripe API key:", error.message);
  }
}

 
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
   // getRazorpayApiKey();

   getStripeApiKey();
   
  }, []);

  return (

    
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
    

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        
      <Route exact path="/account" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      <Route exact path="/me/update" element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />} />
      <Route exact path="/password/update" element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" />} />
      <Route exact path="/login" element={<LoginSignUp />} />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/login/shipping" element={isAuthenticated ? <Shipping /> : <Navigate to="/login" />} />
      <Route exact path="/order/confirm" element={isAuthenticated ? <ConfirmOrder /> : <Navigate to="/login" />} />
      
      <Route exact path="/success" element={isAuthenticated ? <OrderSuccess /> : <Navigate to="/login" />}/>
      <Route exact path="/orders" element={isAuthenticated ? <MyOrders /> : <Navigate to="/login" />}/>
      <Route exact path="/order/:id" element={isAuthenticated ? <OrderDetails /> : <Navigate to="/login" />}/>
      <Route
        exact
        path="/process/payment"
        element={
          stripeApiKey ? (
            <Elements stripe={loadStripe(stripeApiKey)}>
              {isAuthenticated ? <Payment /> : <Navigate to="/login" />}
            </Elements>
          ) : null
        }
      />
          <Route isAdmin={true}
          exact
          path="/admin/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}/>
   <Route
  exact
  path="/admin/products"
  isAdmin={true}
  element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />}
/>
          <Route
          exact
          path="/admin/product"
          isAdmin={true}
          element={isAuthenticated ?<NewProduct/> : <Navigate to="/login" />}
        />

     
      <Route
          exact
          path="/admin/orders"
          isAdmin={true}
          element={isAuthenticated ?<OrderList/> : <Navigate to="/login" />}
        />

      
       <Route
          exact
          path="/admin/users"
          isAdmin={true}
          element={isAuthenticated ?<UsersList /> : <Navigate to="/login" />}
        />

        {/*   <Route
          exact
          path="/admin/user/:id"
          isAdmin={true}
          element={isAuthenticated ?<UpdateUser/> : <Navigate to="/login" />}
        />

        <Route
          exact
          path="/admin/reviews"
          isAdmin={true}
          element={isAuthenticated ?<ProductReviews />: <Navigate to="/login" />}
        /> */}


     
    
      </Routes>
  
      <Footer />

    </Router>


  );



}

export default App;
