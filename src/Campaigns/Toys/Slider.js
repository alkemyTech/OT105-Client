import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectCube,
} from 'swiper';
import 'swiper/swiper-bundle.css';
import s from '../../Styles/ToysCampaign/Slider.module.css';
import image1 from '../../assets/foto5.jpg';
import image2 from '../../assets/foto8.jpg';
import image3 from '../../assets/foto7.jpg';

SwiperCore.use([Navigation, Pagination, Autoplay, EffectCube]);

const Slider = () => {
  return (
    <>
      <Swiper
        autoplay={{ delay: 5000 }}
        className={s.swiperContainer}
        centeredSlides={true}
        effect="cube"
        loop={true}
        navigation
        slidesPerView={1}
        tag="section"
        wrapperTag="div">
        <SwiperSlide tag="div">
          <div className={s.slideContainer}>
            <img className={s.slideImage} src={image1} />
            <div className={s.slideTextContainer}>
              <p className={s.slideText}>Texto para el titulo aqui</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide tag="li">
          <div className={s.slideContainer}>
            <img className={s.slideImage} src={image2} />
            <div className={s.slideTextContainer}>
              <p className={s.slideText}>Texto para el titulo aqui</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide tag="li">
          <div className={s.slideContainer}>
            <img className={s.slideImage} src={image1} />
            <div className={s.slideTextContainer}>
              <p className={s.slideText}>Texto para el titulo aqui</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
