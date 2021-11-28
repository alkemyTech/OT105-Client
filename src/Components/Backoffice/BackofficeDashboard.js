import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import CustomAppBar from './CustomAppBar';

const BackOfficeDashBoard = () => {
  const [user, setUser] = useState({ name: '', image: '' });
  const getUser = () => {
    return {
      name: 'Jane Doe',
      image:
        'https://images.unsplash.com/photo-1573607217032-18299406d100?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
    };
  };

  useEffect(() => {
    const resp = getUser();

    setUser(resp);
  }, []);

  return (
    <>
      <CustomAppBar user={user} />

      <Typography
        sx={{ fontSize: 40, textAlign: 'center', marginTop: 20 }}
        variant="p"
        gutterBottom
        component="p">
        {user.name}
      </Typography>

      <Typography
        sx={{ fontSize: 45, textAlign: 'center' }}
        variant="p"
        gutterBottom
        component="p">
        Bienvenida al dashboard!
      </Typography>
    </>
  );
};

export default BackOfficeDashBoard;
