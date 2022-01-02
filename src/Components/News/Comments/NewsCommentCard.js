import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { commentsCard } from '../../../Styles/NewsComments/NewsCommentsStyles';

const NewsCommentCard = ({ comment }) => {
  const getCommentDate = () => {
    const created = new Date(comment.created_at);
    const day = created.getDate();
    const month = created.getMonth();
    const year = created.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <Card sx={commentsCard}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" sx={{ bgcolor: red[500] }}>
            CU
          </Avatar>
        }
        subheader={getCommentDate()}
        title={comment.user}
      />
      <CardContent>
        <Typography color="text.secondary" variant="body2">
          {comment.text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NewsCommentCard;
