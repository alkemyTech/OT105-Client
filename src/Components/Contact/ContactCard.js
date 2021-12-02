import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  cardTitle,
  cardContent,
} from '../../Styles/Contact/contactCardTypography';
import s from '../../Styles/Contact/ContactCard.module.css';

const ContactCard = ({ children, contactTitle, contactInfo }) => {
  return (
    <Box className={s.cardContainer}>
      <Box className={s.titleContainer}>
        {children}
        <Typography sx={cardTitle} component="h2">
          {contactTitle}
        </Typography>
      </Box>
      <Box>
        <Typography sx={cardContent} component="p" variant="p">
          {contactInfo}
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactCard;
