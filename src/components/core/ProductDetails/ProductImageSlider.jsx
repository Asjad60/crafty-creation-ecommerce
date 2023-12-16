import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const ProductImageSlider = ({ images }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={205}
      loop={true}
      modules={[Pagination]}
      className="mySwiper max-w-[700px] mx-auto  w-full object-cover "
    >
      {images?.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt="ProductImage"
            className="max-w-[500px]  w-full max-h-[500px] h-full object-contain"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductImageSlider;
