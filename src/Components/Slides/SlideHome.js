import { React } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectCube,
} from 'swiper';
import 'swiper/swiper-bundle.css';
import '../../Components/SlideHome.css';

SwiperCore.use([Navigation, Pagination, Autoplay, EffectCube]);

const SlideHome = () => {
  const dataAux = [
    {
      img: 'https://images.pexels.com/photos/10260685/pexels-photo-10260685.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      title: 'Proyecto',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt optio cumque totam quas delectus quo saepe ipsa corporis ullam! Consectetur.',
      id: 1,
    },
    {
      img: 'https://images.pexels.com/photos/9980612/pexels-photo-9980612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      title: 'Proyecto',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt optio cumque totam quas delectus quo saepe ipsa corporis ullam! Consectetur.',
      id: 2,
    },
    {
      img: 'https://images.pexels.com/photos/10001433/pexels-photo-10001433.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      title: 'Proyecto',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt optio cumque totam quas delectus quo saepe ipsa corporis ullam! Consectetur.',
      id: 3,
    },
    {
      img: 'https://images.pexels.com/photos/9969346/pexels-photo-9969346.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      title: 'Proyecto',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt optio cumque totam quas delectus quo saepe ipsa corporis ullam! Consectetur.',
      id: 4,
    },
    {
      img: 'https://images.pexels.com/photos/9412345/pexels-photo-9412345.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      title: 'Proyecto',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt optio cumque totam quas delectus quo saepe ipsa corporis ullam! Consectetur.',
      id: 5,
    },
  ];

  const showSlides = () =>
    dataAux?.map((slide) => (
      <SwiperSlide key={slide.id} tag="li">
        <div className="slideContainer">
          <img className="slideImege" src={slide.img} />
          <div className="slideContainer2">
            <h4 className="slideTitle">{slide.title}</h4>
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
