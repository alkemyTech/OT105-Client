import React, { useState, useEffect } from 'react';
import CardList from './CardsList';
import Title from '../Title/Title';
import LeafletMap from './LeafletMap';
import { getOrganization } from '../../Services/organizationService';
import titleImage from '../../assets/img/contact_S.jpg';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    twitter_url: '',
    instagram_url: '',
    facebook_url: '',
    cellphone: '',
    address: '',
  });

  const updateContactInfo = () => {
    getOrganization().then((res) => setContactInfo(res.data));
  };

  useEffect(() => {
    updateContactInfo();
  }, []);

  return (
    <>
      <Title imageUrl={titleImage} titleText="Contacto" />
      <CardList contactInfo={contactInfo} />
      {contactInfo.address && <LeafletMap address={contactInfo.address} />}
    </>
  );
};

export default Contact;
