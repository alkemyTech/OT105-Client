import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { commentsCardStyles } from '../../../Styles/NewsComments/NewsCommentsStyles';
import { sliceDate } from '../../../Utils';

const NewsCommentCard = ({ comment }) => {
  const date = sliceDate(comment.created_at);

  return (
    <Card sx={commentsCardStyles}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" sx={{ backgroundColor: '#db5752' }}>
            SM
          </Avatar>
        }
        subheader={date}
        title={comment.user}
      />
      <CardContent>
        <Typography color="text.secondary" variant="p">
          {comment.text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NewsCommentCard;
