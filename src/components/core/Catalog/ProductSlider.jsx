import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Pagination, FreeMode } from "swiper/modules";
// import { FreeMode, Pagination } from "swiper";
import ProductCard from "./ProductCard";

const ProductSlider = ({ products }) => {
  return (
    <>
      {products?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
              spaceBetween: 100,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className="max-h-[30rem]"
        >
          {products?.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>No Products Found</div>
      )}
    </>
  );
};

export default ProductSlider;
