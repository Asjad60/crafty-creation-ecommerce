import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categoryEndpoints } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import ProductSlider from "../components/core/Catalog/ProductSlider";
import ProductCard from "../components/core/Catalog/ProductCard";

function Catalog() {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [active, setActive] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector(
          "GET",
          categoryEndpoints.GET_CATEGORIES_API
        );
        const category_id = res?.data?.data.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id;
        setCategoryId(category_id);
      } catch (error) {
        console.log("getCategories", error);
      }
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const response = await getCatalogPageData(categoryId);
        console.log("getCategoryDetails ===> ", response);
        setCatalogPageData(response);
      } catch (error) {
        console.log("getCategoryDetails", error);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    <div className="grid place-items-center min-h-screen min-w-full">
      <div className="spinner"></div>
    </div>;
  }

  return (
    <div className=" text-white">
      <div className=" mx-auto bg-[#161d29] min-h-[240px] rounded-md w-full">
        <div className="mx-auto  px-4 py-20 w-full max-w-maxContentTab lg:max-w-maxContent">
          <p className="text-slate-400 text-sm mb-4">
            Home / Catalog /
            <span className="text-yellow-400">
              {catalogName[0].toUpperCase() +
                catalogName.slice(1).split("-").join(" ")}
            </span>
          </p>
          <p className="text-3xl font-medium">
            {" "}
            {catalogName[0].toUpperCase() +
              catalogName.slice(1).split("-").join(" ")}
          </p>
        </div>
      </div>

      <div>
        {/* section 1  */}
        <div className=" mx-auto  px-4 py-12 w-full max-w-maxContentTab lg:max-w-maxContent">
          <p className="text-2xl font-medium md:text-4xl">
            Products to get you Started
          </p>
          <div className="flex gap-x-5 border-b border-b-[#2C333F] cursor-pointer">
            <p
              className={`py-2 ${
                active === 1
                  ? "border-b border-b-yellow-400 text-yellow-400"
                  : ""
              }`}
              onClick={() => setActive(1)}
            >
              Most Popular
            </p>
            <p
              className={`py-2 ${
                active === 2
                  ? "border-b border-b-yellow-400 text-yellow-400"
                  : ""
              }`}
              onClick={() => setActive(2)}
            >
              New
            </p>
          </div>
          <div className="py-4 w-full">
            <ProductSlider
              products={catalogPageData?.data?.selectedCategory?.products}
            />
          </div>
        </div>

        {/* section2 */}
        <div className=" mx-auto  px-4 py-12 w-full max-w-maxContentTab lg:max-w-maxContent">
          <p className="text-2xl font-medium md:text-4xl mb-4">
            Top Products in {catalogPageData?.data?.differentCategory?.name}
          </p>
          <div className="py-8 border-t border-[#2C333F] w-full">
            <ProductSlider
              products={catalogPageData?.data?.differentCategory?.products}
            />
          </div>
        </div>

        {/* section 3 */}
        <div className="mx-auto  px-4 py-12 w-full max-w-maxContentTab lg:max-w-maxContent">
          <p className="text-2xl lg:text-4xl font-medium  ">
            Frequently Bought
          </p>
          <div className="py-8">
            <div className="grid max-[640px]:place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {catalogPageData?.data?.mostSellingProducts
                .slice(0, 8)
                .map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
