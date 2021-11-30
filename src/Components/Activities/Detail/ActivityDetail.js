import React, { useEffect, useState } from 'react';
//COMPONENTS
import Title from '../../Title/Title';

//MUI
import { CircularProgress, Container, Typography } from '@mui/material';

//In the future this API call logic should be moved.
import axios from 'axios';
const getActivityById = (id) => {
  return axios.get(`http://ongapi.alkemy.org/api/activities/${id}`);
};

export default function ActivityDetail({ match }) {
  const [details, setDetails] = useState({});
  const { name, description, image } = details;
  const [isLoading, setIsLoading] = useState(true);

  const activityId = match.params.id;

  useEffect(() => {
    getActivityById(activityId)
      .then((res) => {
        console.log(res.data);
        setDetails(res.data.data);
      })
      .catch((e) => {
        console.log(e.response.data);
        setDetails(e.response.data);
      })
      .finally(() => setIsLoading(false));
  }, [activityId]);

  if (isLoading) {
    return (
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </Container>
    );
  } else
    return (
      <div>
        <Title
          bckgOpacity="0.5"
          imageUrl={image}
          titlePadding="10rem"
          titleText={name}
        />
        <Container maxWidth="md" sx={{ marginTop: '3rem' }}>
          <Typography color="initial" sx={{ marginBlock: '1rem' }} variant="h4">
            Detalle de actividad
          </Typography>
          <Typography color="initial" variant="body1">
            {description}
          </Typography>
        </Container>
      </div>
    );
}
