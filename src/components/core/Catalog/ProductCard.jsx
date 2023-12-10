import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";

const Product_Card = ({ product, Height = "", Width }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(product?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [product]);

  return (
    <>
      <Link to={`/products/${product._id}`}>
        <div>
          <div>
            <img
              src={product?.thumbnail}
              alt={product?.name}
              className={`h-[200px] ${
                Width ? Width : "w-[200px]"
              } rounded-xl object-cover `}
            />
          </div>
          <div>
            <p>{product?.productName}</p>
            <div className="flex gap-x-3">
              <span>{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span>{product?.ratingAndReviews?.length} Ratings</span>
            </div>
          </div>
          <p>Rs.{product?.price}</p>
        </div>
      </Link>
    </>
  );
};

export default Product_Card;
