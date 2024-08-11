import React, { useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from "./sliders.module.scss";
import CategoryCard from '../card/category-card';
import dummyData from "../../services/dummy-data.json";
import ProductCard from '../card/product-card';
console.log(dummyData.products)
export default function BestProductSlider() {
  const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <>
      <div className={`${styles.swiper_button_container} mb-3`}>
        <div className={`${styles.nav_btn}`} onClick={goPrev}><FaArrowLeft /></div>
        <div className={`${styles.nav_btn}`} onClick={goNext}><FaArrowRight /></div>
      </div>
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          992: { slidesPerView: 3, spaceBetween: 30 },
          1200: { slidesPerView: 4, spaceBetween: 30 },
        }}
        className="mySwiper"
      >
        {dummyData?.products?.map((item, key) => (
          <SwiperSlide key={key} className='d-flex justify-content-center'>
            <ProductCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
