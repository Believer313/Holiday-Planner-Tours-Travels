
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

const Hero = () => {
  return (
    <div className="hero">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/assets/DarjeelingTrainFruitshop_(2).jpg" alt="Darjeeling Train" className="swiper-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/Beachbakkhali.jpg" alt="Bakkhali Beach" className="swiper-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/ootytea.jpg" alt="Ooty Tea Plantation" className="swiper-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/kodaikanal.jpg" alt="Kodaikanal" className="swiper-img" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;