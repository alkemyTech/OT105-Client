import React from 'react';
import { Typography } from '@mui/material';
import Title from '../../Title/Title';

const NewsDetail = () => {
  return (
    <div>
      <Title />
      <div>
        <div>Image Here</div>
        <div>
          <Typography variant="h4" component="h3">
            News Title Here
          </Typography>
          <Typography variant="p" component="p">
            News Content Here
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
