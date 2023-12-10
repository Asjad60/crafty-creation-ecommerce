import React from "react";
import ProductCard from "./core/Catalog/ProductCard";

function Products({ products }) {
  return (
    <div className="products text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 overflow-hidden">
      {products?.length ? (
        products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))
      ) : (
        <p style={{ color: "white" }}>No Data found</p>
      )}
    </div>
  );
}

export default Products;
