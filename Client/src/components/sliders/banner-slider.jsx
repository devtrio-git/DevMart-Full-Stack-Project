import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import banner1 from "../../assets/imgs/banner1.png"
// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import styles from "./sliders.module.scss"


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function BannerSlider({ images }) {
    return (
        <>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper bannerSlider" 
            >
                {
                    images?.map((item, key) => (
                        <SwiperSlide key={key}>
                            <div className={styles.img_container}>
                                <img src={item} alt="item" />
                            </div>
                        </SwiperSlide>
                    ))

                }


            </Swiper>
        </>
    );
}
