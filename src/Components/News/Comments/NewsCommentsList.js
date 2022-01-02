import React, { useEffect, useState } from 'react';
import { getAllComments } from '../../../Services/commentsService';
import NewsCommentCard from './NewsCommentCard';
import CustomSkeleton from '../../CustomComponents/CustomSkeleton/CustomSkeleton';
import Stack from '@mui/material/Stack';
import style from '../../../Styles/NewsComments/NewsComments.module.css';

const NewsCommentsList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getComments = () => {
    setLoading(true);
    getAllComments()
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        setComments(null);

        return;
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className={style.commentsContainer}>
      {loading ? (
        <Stack spacing={1} style={{ maxWidth: '300px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: '20px',
            }}>
            <CustomSkeleton height={40} type="avatar" width={40} />
            <CustomSkeleton height={20} variant="text" width={150} />
          </div>
          <CustomSkeleton height={118} variant="rectangular" width={210} />
        </Stack>
      ) : (
        comments.map((comment) => (
          <NewsCommentCard key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
};

export default NewsCommentsList;
