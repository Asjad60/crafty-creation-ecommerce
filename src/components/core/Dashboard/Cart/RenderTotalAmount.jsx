import React from "react";
import { useSelector } from "react-redux";
import IconButton from "../../../common/IconButton";

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);

  const handleBuyCourse = () => {
    // const products = cart.map((product) => product._id);
    // console.log(products);
  };
  return (
    <div className="flex flex-col gap-2 bg-[#161d29] justify-center max-h-[170px] max-w-[200px] w-full p-4 rounded-md border border-[#2C333F] max-[1024px]:mx-auto">
      <p className="opacity-70 text-sm">Total :</p>
      <p className="text-xl font-medium text-yellow-400">Rs {total}</p>
      <IconButton
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  );
};

export default RenderTotalAmount;
