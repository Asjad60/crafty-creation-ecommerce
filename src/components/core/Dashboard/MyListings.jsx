import React, { useState, useEffect, useCallback } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import {
  deleteProduct,
  getMyProducts,
} from "../../../services/operations/productApi";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "../../common/IconButton";
import { VscAdd } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../services/formatedDate";
import { PRODUCT_STATUS } from "../../../utils/constants";
import { HiClock } from "react-icons/hi";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { setEditProduct } from "../../../slices/productSlice";
import ConfirmationModal from "../../common/ConfirmationModal";
import { FaCheck } from "react-icons/fa";

const MyProducts = () => {
  const { token } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const result = await getMyProducts(token);
      if (result) {
        setProducts(result);
      }
    };
    getProducts();
    //eslint-disable-next-line
  }, []);

  const handleProductDelete = useCallback(
    async (productId) => {
      setLoading(true);
      await deleteProduct({ productId }, token);
      const result = await getMyProducts(token);
      if (result) {
        setProducts(result);
      }
      setConfirmationModal(null);
      setLoading(false);
    },
    //eslint-disable-next-line
    [products, loading]
  );

  console.log("products ==> ", products);
  return (
    <div>
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-semibold text-slate-50">My Listings</h1>
        <IconButton
          text="Add Product"
          onclick={() => navigate("/dashboard/add-product")}
        >
          <VscAdd />
        </IconButton>
      </div>
      <div className=" sm:border sm:border-[#161D29] p-2">
        <div className="max-[640px]:hidden flex justify-between p-2 ">
          <div className="text-slate-400">
            <p>PRODUCTS</p>
          </div>
          <div className="flex gap-12 text-slate-400 tracking-wide">
            <p>PRICE</p>
            <p>ACTIONS</p>
          </div>
        </div>

        {products.length > 0 ? (
          products.map((item) => (
            <div
              className="text-white flex  gap-x-4 border-t-[#161D29] border-t  py-6"
              key={item._id}
            >
              <div className="flex flex-col sm:flex-row gap-x-4 w-[82%] pr-2">
                <img
                  src={item?.thumbnail}
                  alt="productTHmbnail"
                  className="w-[100%] min-w-[120px] max-w-[180px] min-h-[120px] max-h-[180px] h-full rounded-md object-cover"
                />
                <div className="flex flex-col gap-4 justify-center overflow-scroll">
                  <h2 className="text-lg font-medium">{item?.productName}</h2>
                  <p className="text-sm text-gray-500 max-[450px]:whitespace-nowrap">
                    {
                      /* {item?.productDescription.split(" ").length > 20
                      ? item.productDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ") + "..."
                      : item?.productDescription} */
                      item?.category?.name
                    }
                  </p>

                  <p className="text-sm">
                    Created: {formatDate(item?.createdAt)}
                  </p>
                  {item?.status === PRODUCT_STATUS.DRAFT ? (
                    <p className="flex items-center gap-2 w-fit rounded-2xl text-sm bg-[#161d29] py-1 px-2 text-red-600">
                      <HiClock size={14} />
                      Drafted
                    </p>
                  ) : (
                    <p className="flex items-center gap-2 py-1 px-2 text-sm w-fit rounded-2xl text-green-600 bg-[#161d29]">
                      {" "}
                      <FaCheck size={14} /> Published
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:hidden flex flex-col gap-y-10 opacity-70 h-24">
                <p>PRICE</p>
                <p>ACTIONS</p>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-10 mr-4 h-24">
                <p className="flex items-center opacity-70">
                  {" "}
                  <BsCurrencyRupee /> {item?.price}
                </p>
                <div className="flex gap-x-4 text-xl ml-3 opacity-70">
                  <button
                    className="hover:text-blue-500 transition-all hover:scale-125"
                    onClick={() => {
                      dispatch(setEditProduct(true));
                      navigate(`/dashboard/edit-product/${item._id}`);
                    }}
                    title="Edit"
                  >
                    <GoPencil />
                  </button>
                  <button
                    className="hover:text-red-500 transition-all hover:scale-125"
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this product?",
                        text2:
                          "All the data related to this Product will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleProductDelete(item._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                    title="Delete"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No Products</div>
        )}
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default MyProducts;
