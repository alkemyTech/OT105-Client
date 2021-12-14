import React, { useState, useEffect } from 'react';
import CardList from './CardsList';
import Title from '../Title/Title';
import { getContactInfo } from '../../Services/contactsService';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    instagram: '',
    facebook: '',
    phone: '',
  });

  const updateContactInfo = async () => {
    let contactData = await getContactInfo().then((response) => response);

    console.log(contactData.data[0].name);

    setContactInfo({
      email: contactData.data[0].email,
      instagram: contactData.data[0].name,
      facebook: contactData.data[0].name,
      phone: contactData.data[0].phone,
    });
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
