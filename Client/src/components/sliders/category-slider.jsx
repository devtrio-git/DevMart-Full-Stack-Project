import React, { useRef } from 'react';
import c1 from "../../assets/imgs/c1.png";
import c2 from "../../assets/imgs/c2.png";
import c3 from "../../assets/imgs/c3.png";
import c4 from "../../assets/imgs/c4.png";
import c5 from "../../assets/imgs/c5.png";
import c6 from "../../assets/imgs/c6.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from "./sliders.module.scss";
import CategoryCard from '../card/category-card';

const categories = [
  { icon: c1, title: "Phones" },
  { icon: c2, title: "Computers" },
  { icon: c3, title: "Phones" },
  { icon: c4, title: "Computers" },
  { icon: c5, title: "Phones" },
  { icon: c6, title: "Computers" },
  { icon: c1, title: "Phones" },
  { icon: c2, title: "Computers" },
  { icon: c3, title: "Phones" },
  { icon: c4, title: "Computers" },
  { icon: c5, title: "Phones" },
  { icon: c6, title: "Computers" },
];

export default function CategorySlider() {
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
          0: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          992: { slidesPerView: 5, spaceBetween: 30 },
          1200: { slidesPerView: 6, spaceBetween: 30 },
        }}
        className="mySwiper"
      >
        {categories.map((item, key) => (
          <SwiperSlide key={key} className='d-flex justify-content-center'>
            <CategoryCard icon={item.icon} title={item.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
