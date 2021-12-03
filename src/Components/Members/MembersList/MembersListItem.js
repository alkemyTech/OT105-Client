import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';

const MembersListItem = ({ member }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            sx={{ width: 80, height: 80, marginRight: 3 }}
            alt="Remy Sharp"
            src={member.image}
          />
        </ListItemAvatar>
        <ListItemText
          primary={member.name}
          secondary={
            <>
              <Typography component="p" variant="body2">
                {member.description}
              </Typography>
              <Tooltip sx={{ padding: 0 }} title={member.facebookUrl} arrow>
                <IconButton>
                  <FacebookIcon
                    fontSize="large"
                    onClick={() => console.log('Facebook')}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip sx={{ padding: 0 }} title={member.linkedinUrl} arrow>
                <IconButton>
                  <LinkedInIcon
                    fontSize="large"
                    onClick={() => console.log('LinkedIn')}
                  />
                </IconButton>
              </Tooltip>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default MembersListItem;
