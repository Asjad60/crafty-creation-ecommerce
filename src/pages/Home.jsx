import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiconnector";
import { allProductData } from "../services/apis";
import Products from "../components/Products";
import Footer from "../components/common/Footer";

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    try {
      async function getProductData() {
        const response = await apiConnector(
          "GET",
          allProductData.GET_PRODUCT_API
        );
        setProducts(response.data.data);
        // console.log(response.data.data);
      }
      getProductData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="p-5 grid justify-center min-h-[calc(100vh-3.6rem)] w-screen">
        <div className="max-w-[1260px]">
          <Products products={products} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
