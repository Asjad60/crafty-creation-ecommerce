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

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Effect running for productId:", productId);
    (async () => {
      try {
        const products = await getFullProductDetails(productId);
        console.log("productdetails +++++> ", products);
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
      <div className="min-h-[203vh]">
        <div className=" max-w-maxContent mx-auto w-full h-[100vh] gap-x-8 flex px-6 pt-6 border-b border-b-[#2c333f]">
          <div className="flex flex-col gap-y-4 sticky top-5 max-h-[440px]">
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

          <div className="text-white flex flex-col ml-4">
            <p className="text-3xl font-medium">
              {productDetails?.productName}
            </p>
            <p className=" font-medium">{productDetails?.productDescription}</p>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default ProductDetails;
