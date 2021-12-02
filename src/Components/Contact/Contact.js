import React, { useState, useEffect } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import Title from '../Title/Title';
import ContactCard from './ContactCard';
const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    instagram: '',
    facebook: '',
    phone: '',
  });

  const getContactInfo = () => ({
    email: 'somosfundacionmas@gmail.com',
    instagram: 'SomosMás',
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
      <ContactCard contactTitle="Escribenos" contactInfo={contactInfo.email}>
        <MailIcon />
      </ContactCard>
      <ContactCard
        contactTitle="Nuestro Instagram"
        contactInfo={contactInfo.instagram}>
        <InstagramIcon />
      </ContactCard>
      <ContactCard
        contactTitle="Nuestro Facebook"
        contactInfo={contactInfo.facebook}>
        <FacebookIcon />
      </ContactCard>
      <ContactCard contactTitle="Llamanos" contactInfo={contactInfo.phone}>
        <PhoneIcon />
      </ContactCard>
    </>
  );
};

export default Contact;
