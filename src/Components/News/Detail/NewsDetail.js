import React, { useState, useEffect } from 'react';

import { Typography, Box } from '@mui/material';
import Title from '../../Title/Title';
import style from '../../../Styles/NewsDetail/NewsDetail.module.css';

const NewsDetail = () => {
  const [newsDetail, setNewsDetail] = useState({
    name: '',
    content: '',
    image: '',
  });

  const getNewsDetails = () => ({
    name: 'Titulo de la noticia',
    content:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus omnis dolor illum error quas iusto eum, rerum, ad at quis perferendis fuga. Dolorem repellat, quae qui quisquam perspiciatis numquam nesciunt!. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus omnis dolor illum error quas iusto eum, rerum, ad at quis perferendis fuga. Dolorem repellat, quae qui quisquam perspiciatis numquam nesciunt!',
    image:
      'https://images.unsplash.com/photo-1592060036126-1b6d5139dea4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  });

  const updateCurrentNews = () => {
    const currentNews = getNewsDetails();

    setNewsDetail(currentNews);
  };

  useEffect(() => {
    updateCurrentNews();
  }, []);

  return (
    <div>
      <Title titleText={newsDetail.name} imageUrl={newsDetail.image} />
      <Box component="div" className={style.container}>
        <Box component="div" className={style.content}>
          <Typography variant="p" component="p">
            {newsDetail.content}
          </Typography>
        </Box>
        <Box component="div" className={style.image}>
          <img src={newsDetail.image} alt="childrens at play" />
        </Box>
      </Box>
    </div>
  );
};

export default NewsDetail;
