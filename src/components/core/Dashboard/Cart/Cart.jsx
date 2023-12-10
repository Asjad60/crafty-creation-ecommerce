import React from "react";
import { useSelector } from "react-redux";
import RenderCartProducts from "./RenderCartProducts";
import RenderTotalAmount from "./RenderTotalAmount";
import IconButton from "../../../common/IconButton";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { totalItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <div className="text-white">
      <h1 className="text-3xl font-semibold mb-10">Your Cart</h1>
      <p className="text-slate-400 border-b border-b-[#2C333F] py-2">
        {totalItems} Products In Cart
      </p>
      {totalItems > 0 ? (
        <div className="flex gap-6 justify-between mt-6 flex-col lg:flex-row">
          <RenderCartProducts />
          <RenderTotalAmount />
        </div>
      ) : (
        <div className="flex flex-col gap-2 min-h-[70vh] items-center justify-center">
          <p className="text-xl font-medium">Your Cart is Empty</p>
          <IconButton
            text="Buy"
            onclick={() => navigate("/")}
            customClasses="px-10 mt-4"
          />
        </div>
      )}
    </div>
  );
}
