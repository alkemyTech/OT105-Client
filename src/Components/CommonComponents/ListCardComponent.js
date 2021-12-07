import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';

const ListCardComponent = () => {
  const [listData, setListData] = useState();

  useEffect(() => {
    //method for fetch data and update state
    //setListData(data);
  }, []);

  const placeholderImage =
    'https://www.palomacornejo.com/wp-content/uploads/2021/08/no-image.jpg';

  return (
    <Box
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
      }}>
      <Container
        sx={{
          display: 'flex',
          flexGrow: 1,
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'start',
          margin: '0 auto',
        }}>
        {listData &&
          listData.map((newData) => (
            <Card key={newData.id} sx={{ minWidth: 300, maxWidth: 300 }}>
              <CardMedia
                alt={newData.title + ' image'}
                component="img"
                height="140"
                image={newData.image || placeholderImage}
              />
              <CardContent>
                <Typography gutterBottom component="div" variant="h5">
                  {newData.title}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {newData.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Saber más</Button>
              </CardActions>
            </Card>
          ))}
      </Container>
    </Box>
  );
};

export default ListCardComponent;
