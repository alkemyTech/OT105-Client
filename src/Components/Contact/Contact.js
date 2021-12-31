import React, { useState, useEffect } from 'react';
import CardList from './CardsList';
import Title from '../Title/Title';
import LeafletMap from './LeafletMap';
import { getOrganization } from '../../Services/organizationService';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    instagram: '',
    facebook: '',
    phone: '',
  });
  const [address, setAddress] = useState('');

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
    getOrganization().then((res) => setAddress(res.data.address));
  }, []);

  return (
    <>
      <Title titleText="Contacto" />
      <CardList contactInfo={contactInfo} />
      {address && <LeafletMap address={address} />}
    </>
  );
};

export default Contact;
