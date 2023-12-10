import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { AiFillStar } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
// import ReactStars from "react-rating-stars-component";
import { removeFromCart } from "../../../../slices/cartSlice";
import GetAvgRating from "../../../../utils/avgRating";
import RatingStars from "../../../common/RatingStars";
import { Link } from "react-router-dom";

const RenderCartProducts = () => {
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const avgCounts = {};
    cart.forEach((element) => {
      const count = GetAvgRating(element?.ratingAndReviews);
      avgCounts[element?._id] = count;
    });

    setAvgReviewCount(avgCounts);
  }, [cart]);

  return (
    <div className=" divide-y divide-[#2C333F] w-full">
      {cart.map((product, index) => (
        <Link
          to={`/products/${product._id}`}
          key={index}
          className="flex gap-6 justify-between p-2"
        >
          <div className="flex gap-4 max-[570px]:flex-col w-full">
            <img
              src={product?.thumbnail}
              alt="Product Image"
              className="max-w-[150px] w-full min-h-[150px] h-full object-cover rounded-md"
            />
            <div className="flex flex-col flex-1">
              <p className="">{product?.productName}</p>
              <p className="opacity-50">{product?.category?.name}</p>
              <div className="flex gap-x-2 items-center">
                <span>{avgReviewCount[product._id] || 0}</span>
                {/* <ReactStars
                  count={5}
                  value={product?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<AiFillStar />}
                  fullIcon={<AiFillStar />}
                /> */}
                <span className="mb-1">
                  <RatingStars Review_Count={avgReviewCount[product._id]} />
                </span>
                <span className="text-white">
                  {product?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-y-3 max-h-[100px]">
            <button
              onClick={() => dispatch(removeFromCart(product?._id))}
              className="flex gap-x-2 items-center bg-[#161d29] p-2 rounded-md text-red-600"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="text-xl font-medium text-yellow-400">
              ₹ {product?.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RenderCartProducts;
