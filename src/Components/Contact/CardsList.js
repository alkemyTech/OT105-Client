import React from 'react';
import { Box } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import ContactCard from './ContactCard';
import { cardIcon } from '../../Styles/Contact/contactCardTypography';
import s from '../../Styles/Contact/ContactCard.module.css';

const CardsList = ({ contactInfo }) => {
  return (
    <Box className={s.cardsContainer}>
      <ContactCard contactInfo={contactInfo.email} contactTitle="Escríbenos">
        <MailIcon fontSize="large" sx={cardIcon} />
      </ContactCard>
      <ContactCard
        contactInfo={contactInfo.instagram}
        contactTitle="Nuestro Instagram">
        <InstagramIcon fontSize="large" sx={cardIcon} />
      </ContactCard>
      <ContactCard
        contactInfo={contactInfo.facebook}
        contactTitle="Nuestro Facebook">
        <FacebookIcon fontSize="large" sx={cardIcon} />
      </ContactCard>
      <ContactCard contactInfo={contactInfo.phone} contactTitle="Llámanos">
        <PhoneIcon fontSize="large" sx={cardIcon} />
      </ContactCard>
    </Box>
  );
};

export default CardsList;
