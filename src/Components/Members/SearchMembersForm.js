import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export const SearchMembersForm = () => {
  const handleChange = () => {
    console.log('handling change');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handling submit');
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      onSubmit={(e) => handleSubmit}>
      <InputBase
        placeholder="Buscar miembros..."
        sx={{ ml: 1, flex: 1 }}
        onChange={handleChange}
      />
      <Divider orientation="vertical" sx={{ height: 28, m: 0.5 }} />
      <IconButton aria-label="search" sx={{ p: '10px' }} type="submit">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
