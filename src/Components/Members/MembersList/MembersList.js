import React from 'react';
import { List } from '@mui/material';
import MembersListItem from './MwmbersListItem';

const mockupMembers = [
  {
    id: 258,
    name: 'Osvaldo Olivera',
    image: 'http://ongapi.alkemy.org/storage/kw2hNujhuq.jpeg',
    description: 'Presidente',
    facebookUrl: 'https://www.facebook.com/100075440371054/',
    linkedinUrl: 'https://www.linkedin.com/in/osvaldo-olivera-785b78226/',
  },
  {
    id: 259,
    name: 'Nahuel Narváez',
    image: 'http://ongapi.alkemy.org/storage/z5x07SOhzl.jpeg',
    description: 'Secretario',
    facebookUrl: 'https://www.facebook.com/100075448260572/',
    linkedinUrl: 'https://www.linkedin.com/in/nahuel-narváez-099b89226/',
  },
  {
    id: 261,
    name: 'Griselda Germán',
    image: 'http://ongapi.alkemy.org/storage/dR97wbZyUN.jpeg',
    description: 'Tesorera',
    facebookUrl: 'https://www.facebook.com/100074894726439/',
    linkedinUrl: 'https://www.linkedin.com/in/griselda-germán-137b83226/',
  },
];

const MembersList = () => {
  return (
    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
      {mockupMembers.map((member) => (
        <MembersListItem member={member} key={member.id} />
      ))}
    </List>
  );
};

export default MembersList;