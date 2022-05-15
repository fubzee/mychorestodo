import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
// import Headline from "../components/headline";




 

const Donate = () => {
      return (
        <div className="container">
          <CategoryMenu />
          <ProductList />
          <Cart />
        </div>
      );
    };


export default Donate;