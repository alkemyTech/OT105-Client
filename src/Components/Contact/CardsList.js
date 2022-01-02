import React from 'react';
import { Box } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import ContactCard from './ContactCard';
import { cardIcon } from '../../Styles/Contact/contactCardTypography';
import s from '../../Styles/Contact/ContactCard.module.css';

const CardsList = ({ contactInfo }) => {
  return (
    <Box className={s.cardsContainer}>
      <ContactCard
        contactInfo={contactInfo.twitter_url}
        contactTitle="Twitter"
        type="social">
        <TwitterIcon fontSize="large" sx={cardIcon} />
      </ContactCard>
      <ContactCard
        contactInfo={contactInfo.instagram_url}
        contactTitle="Instagram"
        type="social">
        <InstagramIcon fontSize="large" sx={cardIcon} />
      </ContactCard>
      <ContactCard
        contactInfo={contactInfo.facebook_url}
        contactTitle="Facebook"
        type="social">
        <FacebookIcon fontSize="large" sx={cardIcon} />
      </ContactCard>
      <ContactCard contactInfo={contactInfo.cellphone} contactTitle="Llámanos">
        <PhoneIcon fontSize="large" sx={cardIcon} />
      </ContactCard>
    </Box>
  );
};

export default CardsList;
