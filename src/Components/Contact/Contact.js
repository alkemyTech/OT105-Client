import React, { useState, useEffect } from 'react';
import CardList from './CardsList';
import Title from '../Title/Title';

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
      <CardList contactInfo={contactInfo} />
    </>
  );
};

export default Contact;
