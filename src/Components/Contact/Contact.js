import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import Title from '../Title/Title';
import ContactCard from './ContactCard';
import { cardIcon } from '../../Styles/Contact/contactCardTypography';
import s from '../../Styles/Contact/ContactCard.module.css';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    instagram: '',
    facebook: '',
    phone: '',
  });

  const getContactInfo = () => ({
    email: 'somosfundacionmas@gmail.com',
    instagram: '@SomosMas',
    facebook: 'Somos_Más',
    phone: '1160112988',
  });

  const updateContactInfo = () => {
    const info = getContactInfo();

    setContactInfo(info);
  };

  useEffect(() => {
    updateContactInfo();
  }, []);

  return (
    <>
      <Title titleText="Contacto" />
      <Box className={s.cardsContainer}>
        <ContactCard contactTitle="Escríbenos" contactInfo={contactInfo.email}>
          <MailIcon sx={cardIcon} fontSize="large" />
        </ContactCard>
        <ContactCard
          contactTitle="Nuestro Instagram"
          contactInfo={contactInfo.instagram}>
          <InstagramIcon sx={cardIcon} fontSize="large" />
        </ContactCard>
        <ContactCard
          contactTitle="Nuestro Facebook"
          contactInfo={contactInfo.facebook}>
          <FacebookIcon sx={cardIcon} fontSize="large" />
        </ContactCard>
        <ContactCard contactTitle="Llámanos" contactInfo={contactInfo.phone}>
          <PhoneIcon sx={cardIcon} fontSize="large" />
        </ContactCard>
      </Box>
    </>
  );
};

export default Contact;
