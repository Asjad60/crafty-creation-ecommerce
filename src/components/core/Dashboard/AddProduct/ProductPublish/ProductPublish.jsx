import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetProductState, setStep } from "../../../../../slices/productSlice";
import IconButton from "../../../../common/IconButton";
import { PRODUCT_STATUS } from "../../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editProductDetails } from "../../../../../services/operations/productApi";

const ProductPublish = () => {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product.status === PRODUCT_STATUS.PUBLISHED) {
      setValue("publish", true);
    }
  }, []);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToProducts = () => {
    dispatch(resetProductState());
    navigate("/dashboard/my-products");
  };

  const handleProductPublish = async () => {
    if (
      (product.status === PRODUCT_STATUS.PUBLISHED &&
        getValues("publish") === true) ||
      (product.status === PRODUCT_STATUS.DRAFT &&
        getValues("publish") === false)
    ) {
      //no updation in form

      goToProducts();
      return;
    }

    const formData = new FormData();
    formData.append("productId", product._id);
    const productStatus = getValues("publish")
      ? PRODUCT_STATUS.PUBLISHED
      : PRODUCT_STATUS.DRAFT;
    formData.append("status", productStatus);

    setLoading(true);
    const result = await editProductDetails(formData, token);
    if (result) {
      goToProducts();
    }

    setLoading(false);
  };

  const onSubmit = async () => {
    handleProductPublish();
  };

  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#161d29] p-4 flex flex-col gap-y-6">
      <h2 className="text-2xl font-medium">Publish Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="checkbox" id="publish" {...register("publish")} />
        <label htmlFor="publish" className="ml-3">
          Make This Product ad Public
        </label>

        <div className="flex justify-end gap-2 mt-10">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="text-black bg-[#ffffff5b] px-4 py-2 rounded-lg font-semibold"
          >
            Back
          </button>

          <IconButton text="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default ProductPublish;
