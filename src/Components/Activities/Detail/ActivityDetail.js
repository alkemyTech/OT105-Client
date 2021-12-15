import React, { useEffect, useState } from 'react';
import Title from '../../Title/Title';
import { CircularProgress, Container, Typography } from '@mui/material';
import { getActivityById } from '../../../Services/activitiesService';

export default function ActivityDetail({ match }) {
  const [details, setDetails] = useState({});
  const { name, description, image } = details;
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const activityId = match.params.id;

  useEffect(() => {
    getActivityById(activityId)
      .then((res) => {
        setSuccess(true);
        setDetails(res.data.data);
      })
      .catch((e) => {
        setSuccess(false);
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
  }

  return (
    <>
      {success ? (
        <div>
          <Title
            bckgOpacity="0.5"
            imageUrl={image}
            titlePadding="10rem"
            titleText={name}
          />
          <Container maxWidth="md" sx={{ marginTop: '3rem' }}>
            <Typography
              color="initial"
              sx={{ marginBlock: '1rem' }}
              variant="h4">
              Detalle de actividad
            </Typography>
            <Typography color="initial" variant="body1">
              {description}
            </Typography>
          </Container>
        </div>
      ) : (
        <Title
          titlePadding="12rem"
          titleText="Actividad no encontrada"
          variant="h3"
        />
      )}
    </>
  );
}
