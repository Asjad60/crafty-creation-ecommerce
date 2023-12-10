import React, { useEffect, useState } from "react";
import RenderSteps from "../AddProduct/RenderSteps";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFullProductDetails } from "../../../../services/operations/productApi";
import { setProduct, setEditProduct } from "../../../../slices/productSlice";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.auth);
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      const response = await getFullProductDetails(productId, token);
      console.log("consling from Edi product ===> ", response);
      if (response) {
        dispatch(setEditProduct(true));
        dispatch(setProduct(response));
      }
      setLoading(false);
    };

    getProductDetails();
  }, []);

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-slate-50">Edit Product</h1>
      {product ? (
        <div className="mx-auto max-w-[600px] text-white">
          <RenderSteps />
        </div>
      ) : (
        <div className="text-white">No Product Found</div>
      )}
    </div>
  );
};

export default EditProduct;
