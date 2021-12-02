import React from 'react';
import { Box, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

const ContactCard = ({ children, contactTitle, contactInfo }) => {
  return (
    <Box>
      <Box>
        {children}
        <Typography variant="h4" gutterBottom component="h3">
          {contactTitle}
        </Typography>
      </Box>
      <Box>
        <Typography variant="p" gutterBottom component="p">
          {contactInfo}
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactCard;
