import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import { Typography, Box } from '@mui/material';
import Title from '../../Title/Title';
import style from '../../../Styles/NewsDetail/NewsDetail.module.css';
import { getNewsById } from '../../../Services/NewsService';
import newsImage from '../../../assets/img/newsBackG_S.jpg';

const NewsDetail = ({ newsTitle }) => {
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState({
    image: '',
    content: '',
  });

  const updateCurrentNews = () => {
    getNewsById(id).then((data) => setNewsDetail(data));
  };

  useEffect(() => {
    updateCurrentNews();
  }, []);

  return (
    <div>
      <Title imageUrl={newsImage} titleText={newsDetail.name} />
      <Box className={style.newsDetail__container} component="div">
        <Box className={style.newsDetail__content} component="div">
          <Typography component="p" variant="p">
            {ReactHtmlParser(newsDetail.content)}
          </Typography>
        </Box>
        <Box className={style.newsDetail__imageContainer} component="div">
          <img
            alt="news image"
            className={style.newsDetail__image}
            src={newsDetail.image}
          />
        </Box>
      </Box>
    </div>
  );
};

export default NewsDetail;
