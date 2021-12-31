import React, { useState, useEffect } from 'react';
import Title from '../Title/Title';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getAllTestimonials } from '../../Services/testimonialsService';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getAllTestimonials().then((response) =>
      setTestimonials(response.data.data),
    );
  }, []);

  return (
    <div>
      <Title titleText={'Testimonios'} />
      <div
        justify="center"
        style={{ width: '800px', margin: '20px auto', display: 'flex' }}>
        {testimonials?.slice(4, 8).map((row) => {
          return (
            <Card
              key={row.id}
              sx={{ width: '345px !important', margin: 'auto 10px' }}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" sx={{ bgcolor: red[500] }}>
                    {row.id}
                  </Avatar>
                }
                subheader={row.createdAt}
                title={row.name}
              />
              <CardMedia
                alt="img"
                component="img"
                height="194"
                image={row.image}
              />
              <CardActions disableSpacing>
                <IconButton aria-label="+" href={`/Testimonials/${row.id}`}>
                  <AddCircleIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;
