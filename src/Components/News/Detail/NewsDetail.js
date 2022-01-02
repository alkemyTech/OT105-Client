import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import { Typography, Box } from '@mui/material';
import LoadSpinner from '../../CommonComponents/LoaderSpinner';
import { TableBody, TableRow, TableCell } from '@mui/material';
import Title from '../../Title/Title';
import style from '../../../Styles/NewsDetail/NewsDetail.module.css';
import { getNewsById } from '../../../Services/NewsService';
import newsImage from '../../../assets/img/newsBackG_S.jpg';

const NewsDetail = ({ newsTitle }) => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState({
    image: '',
    content: '',
  });

  const updateCurrentNews = () => {
    getNewsById(id).then((data) => setNewsDetail(data));
  };

  useEffect(() => {
    if (loading == true) {
      updateCurrentNews();
      setLoading(false);
    }
  }, [loading]);

  return (
    <div>
      {loading == true ? (
        <Box
          className={style.container}
          component="div"
          sx={{ justifyContent: 'center' }}>
          <TableBody>
            <TableRow
              style={{
                height: 'rowHeight' * 10,
              }}>
              <TableCell colSpan={3}>
                <LoadSpinner />
              </TableCell>
            </TableRow>
          </TableBody>
        </Box>
      ) : (
        <div>
          <Title imageUrl={newsDetail.image} titleText={newsDetail.nam} />
          <Box className={style.newsDetail__container} component="div">
            <Box className={style.newsDetail__content} component="div">
              <Typography component="p" variant="p">
                {ReactHtmlParser(newsDetail.content)}
              </Typography>
            </Box>
            <Box className={style.newsDetail__imageContainer} component="div">
              <img
                alt="childrens at play"
                className={style.newsDetail__image}
                src={newsDetail.image}
              />
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
