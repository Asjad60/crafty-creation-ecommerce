import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFullProductDetails } from "../services/operations/productApi";
import IconButton from "../components/common/IconButton";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { ACCOUNT_TYPE } from "../utils/constants";
import toast from "react-hot-toast";
import { buyProduct } from "../services/operations/paymentApi";
import { logout } from "../services/operations/authApi";
import RatingStars from "../components/common/RatingStars";
import GetAvgRating from "../utils/avgRating";
import ProductSpecification from "../components/core/ProductDetails/ProuctSpecification";
import Footer from "../components/common/Footer";
import ProductImageSlider from "../components/core/ProductDetails/ProductImageSlider";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(productDetails?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [productDetails]);

  useEffect(() => {
    (async () => {
      try {
        const products = await getFullProductDetails(productId);
        console.log("productdetails ====> ", products);
        if (products) {
          setProductDetails(products);
        }
      } catch (error) {
        console.log("Can't get Product Details");
      }
    })();
  }, [productId]);

  const { thumbnail, backSideImage, sideImage1, sideImage2 } = productDetails;
  const imgUrls = [thumbnail, backSideImage, sideImage1, sideImage2].filter(
    Boolean
  );
  const [selectedImg, setSelectedImg] = useState("");

  const handleAddToCart = () => {
    if (!token) {
      setConfirmationModal({
        text1: "You Are Not Logged In",
        text2: "Please Login To Add TO Cart",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(false),
      });
      return;
    }

    if (user.accountType === ACCOUNT_TYPE.SUPPLIER) {
      toast.error("You Are Seller You Can't Buy A Product");
      return;
    }

    dispatch(addToCart(productDetails));
  };

  const handleBuyProduct = async () => {
    try {
      if (!token) {
        setConfirmationModal({
          text1: "You are not logged in!",
          text2: "Please login to Purchase Course.",
          btn1Text: "Login",
          btn2Text: "Cancel",
          btn1Handler: () => navigate("/login"),
          btn2Handler: () => setConfirmationModal(null),
        });
        return;
      }

      if (user.accountType === ACCOUNT_TYPE.VISITOR) {
        buyProduct([productId], token, user, navigate, dispatch);
        return;
      }

      setConfirmationModal({
        text1: "You are a Seller!",
        text2: "You Cant Buy a Product.",
        btn1Text: "Logout",
        btn2Text: "Cancel",
        btn1Handler: () => dispatch(logout(navigate)),
        btn2Handler: () => setConfirmationModal(null),
      });
    } catch (error) {
      console.log("Error on HandelBuy Product", error);
    }
  };

  return (
    <>
      <div className="min-h-[150vh]">
        <div className=" max-w-maxContent mx-auto w-full lg:gap-x-10 flex flex-col lg:flex-row p-1 sm:p-6 border-b border-b-[#2c333f]">
          {/* ================= Image Section ================ */}
          <div className="hidden lg:flex flex-col gap-y-4 sticky top-[60px] max-h-[440px]">
            <div className={`flex gap-x-4 `}>
              <div className=" flex flex-col gap-y-2">
                {imgUrls.map((image, i) => (
                  <img
                    src={image}
                    key={i}
                    alt={productDetails?.productName}
                    className={`max-h-[80px] max-w-[80px] object-cover aspect-square cursor-pointer ${
                      selectedImg === image && "border-2 border-blue-500"
                    }`}
                    onMouseOver={() => setSelectedImg(image)}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <img
                  src={selectedImg || imgUrls?.[0]}
                  alt={productDetails?.productName}
                  className=" max-w-[350px] max-h-[350px] object-cover aspect-square"
                />
                <div className="flex justify-around">
                  <button
                    className="rounded-md bg-[#2C333F] text-white p-2"
                    onClick={handleAddToCart}
                  >
                    ADD TO CART
                  </button>
                  <IconButton text={"BUY NOW"} onclick={handleBuyProduct} />
                </div>
              </div>
            </div>
          </div>

          {/* ============ For Mobile Screen Image Slider And Buttons */}
          <div className="flex lg:hidden mb-3">
            <ProductImageSlider images={imgUrls} />
          </div>
          <div className="fixed bottom-0 left-0 bg-[#161d29a9] gap-x-4 p-5 lg:hidden flex w-full justify-around">
            <button
              className="rounded-md bg-[#2C333F] text-white p-2 w-full"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
            <IconButton
              text={"BUY NOW"}
              onclick={handleBuyProduct}
              customClasses={"w-full flex justify-center"}
            />
          </div>

          {/* =============== Product Details Section ==================*/}
          <div className="mx-auto text-white flex flex-col gap-4 max-w-[700px] w-full">
            <div className="flex flex-col ">
              <p className="text-2xl">{productDetails?.productName}</p>
              <div className="flex gap-x-2 text-sm">
                <p>{avgReviewCount.toString()}</p>
                <RatingStars Review_Count={avgReviewCount} Star_Size={17} />
                <p>{productDetails?.ratingAndReviews?.length} Ratings</p>
              </div>
            </div>

            <div className="flex mb-16">
              <p className="text-3xl">₹{productDetails?.price}</p>
            </div>

            <div className="flex gap-x-16 mt-2">
              <h2 className="font-medium text-gray-400">Highlights</h2>
              <div>
                {productDetails?.specifications?.map((data, i) => (
                  <div className="flex items-center gap-4 text-sm" key={i}>
                    <p className="h-[6px] w-[6px] rounded-full bg-gray-500 mb-2"></p>
                    <p className="mb-2">{data}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-x-20 ">
              <p className="text-gray-400 font-medium ">Seller</p>
              <div className="flex gap-x-4 items-center">
                <img
                  src={productDetails?.supplier?.image}
                  alt="SellerImg"
                  className="object-cover max-w-[30px] rounded-full"
                />
                <p>{productDetails?.supplier?.name}</p>
              </div>
            </div>

            <div className="flex flex-col my-4">
              <p className=" text-gray-400 font-medium">Description :</p>
              <p className="text-sm text-gray-500">
                {productDetails?.productDescription}
              </p>
            </div>

            <ProductSpecification product={productDetails} />
          </div>
        </div>
        <Footer />
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default ProductDetails;
