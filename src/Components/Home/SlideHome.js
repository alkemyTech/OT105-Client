import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectCube,
} from 'swiper';
import 'swiper/swiper-bundle.css';
import '../SlideHome.css';
import { getAllSlides } from '../../Services/slidesService';

SwiperCore.use([Navigation, Pagination, Autoplay, EffectCube]);

const SlideHome = () => {
  const [slides, setSlides] = useState(null);

  useEffect(() => {
    getAllSlides().then((response) => setSlides(response.data));
  }, []);

  const showSlides = () =>
    slides?.map((slide) => (
      <SwiperSlide key={slide.id} tag="li">
        <div className="slideContainer">
          <div className="img-container__slide">
            <img className="slideImege" src={slide.image} />
          </div>
          <div className="info-container__slide">
            <h4 className="slideTitle">{slide.name}</h4>
            <p className="slideDescription">{slide.description}</p>
          </div>
        </div>
      </SwiperSlide>
    ));

  return (
    <>
      <Swiper
        navigation
        pagination
        autoplay={{ delay: 5000 }}
        effect={'cube'}
        id="main"
        slidesPerView={1}
        spaceBetween={0}
        tag="section"
        wrapperTag="ul"
        onInit={(swiper) => console.log('Swiper initialized')}>
        {showSlides()}
      </Swiper>
    </>
  );
};

export default SlideHome;
