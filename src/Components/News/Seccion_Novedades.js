import React, { useState } from 'react';
import Title from '../Title/Title';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NewsSearchBar from './NewsSearchBar';

const NewsMock = [
  {
    id: 1058,
    name: 'ihuhuyyyyyyyyyyt',
    createdAt: '2021-11-28',
    image:
      'https://media-exp1.licdn.com/dms/image/C4E1BAQEDDjuh9HQchg/company-background_10000/0/1610631110628?e=2159024400&v=beta&t=00JMFny1Y6JiSd8rpPDIfJ_6vNH6NhtCK_yban1zy3c',
  },
  {
    id: 1151,
    name: 'Name de prueba',
    createdAt: '2021-12-02',
    image:
      'https://media-exp1.licdn.com/dms/image/C4E1BAQEDDjuh9HQchg/company-background_10000/0/1610631110628?e=2159024400&v=beta&t=00JMFny1Y6JiSd8rpPDIfJ_6vNH6NhtCK_yban1zy3c',
  },
  {
    id: 1153,
    name: 'sdfsdf',
    createdAt: '2021-12-02',
    image:
      'https://media-exp1.licdn.com/dms/image/C4E1BAQEDDjuh9HQchg/company-background_10000/0/1610631110628?e=2159024400&v=beta&t=00JMFny1Y6JiSd8rpPDIfJ_6vNH6NhtCK_yban1zy3c',
  },
];

const Seccion_Novedades = () => {
  const [novedades, setNovedades] = useState(NewsMock);

  return (
    <div>
      <Title titleText={'Novedades'} />
      <NewsSearchBar />
      <div
        justify="center"
        style={{ width: '800px', margin: '20px auto', display: 'flex' }}>
        {novedades.map((row) => (
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
              <IconButton aria-label="+" href={`/Novedades/${row.id}`}>
                <AddCircleIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Seccion_Novedades;
