import React, { Fragment,useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
 import MetaData from "../layout/MetaData";
 import {  clearErrors,getProduct } from "../../actions/productAction";
 import { useSelector, useDispatch } from "react-redux";
 import Loader from "../layout/Loader/Loader";
 import { useAlert } from "react-alert";


// const product={
//     name:"abc",
//     images:[{url:"https://fullyfilmy.in/cdn/shop/products/New-Mockups---no-hanger---TShirt-Yellow.jpg?v=1639657077"}],
//     price:"344",
//     _id:"sona",
// };

const Home = () => {
 

  const alert = useAlert();
  const dispatch = useDispatch();
  const {  products,loading,error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);


  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
        <Fragment>
           <MetaData title="ECOMMERCE" />



          <div className="banner">
            <p>Welcome to AllInOne</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
          
             {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}

          </div>

       
       
    </Fragment>
  )}
  </Fragment>
);
};


export default Home;
