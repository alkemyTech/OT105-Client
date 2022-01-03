import React, { useState, useEffect } from 'react';
import Title from '../Title/Title';
import { TableBody, TableCell, TableRow } from '@mui/material';
import Video from './Ultimo Evento/Video';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { Avatar, Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getAllNews } from '../../Services/NewsService.js';
import { NewsSearch_Form } from './NewsSearch_Form';
import { listHasValues, sliceDate } from '../../Utils';
import LoadSpinner from '../CommonComponents/LoaderSpinner';

const Seccion_Novedades = () => {
  const [novedades, setNovedades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedNewsList, setSortedNewsList] = useState([]);
  const rowHeight = 53;

  useEffect(() => {
    getAllNews().then((res) => setNovedades(res));
  }, []);
  const updateLoadingState = (loadingState) => {
    setIsLoading(loadingState);
  };

  const updateNewsList = (updatedNews) => {
    setNovedades(updatedNews);
  };

  return (
    <div>
      <Title bckgColor="#8DCAFF" titleText={'Novedades'} />
      <NewsSearch_Form
        updateLoadingState={updateLoadingState}
        updateNewsList={updateNewsList}
      />
      {!listHasValues(sortedNewsList) && isLoading ? (
        <Alert
          severity="warning"
          sx={{
            margin: '0 auto',
            justifyContent: 'center',
            marginTop: '30px',
          }}>
          Novedad no encontrada!
        </Alert>
      ) : null}

      {isLoading ? (
        <TableBody>
          <TableRow
            style={{
              height: rowHeight * 10,
            }}>
            <TableCell colSpan={3}>
              <LoadSpinner sx={{ justifyContent: 'center' }} />
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
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
                <IconButton aria-label="+" href={`/news/${row.id}`}>
                  <AddCircleIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
      <Video />
    </div>
  );
};

export default Seccion_Novedades;
