import { useState, useEffect } from 'react';
import { InputBase, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getAllUsers, getUsersByKeyword } from '../../Services/userService';

const UsersSearchForm = ({ setIsLoading, setUsersList }) => {
  const [keywords, setKeywords] = useState('');

  const handleChange = (e) => {
    setKeywords(e.target.value);
  };

  useEffect(() => {
    const handleSearch = async () => {
      const trimedInput = keywords.trim();

      setIsLoading(true);
      if (trimedInput.length > 2) {
        const response = await getUsersByKeyword(keywords);
        const newUserList = response.data;

        setUsersList(newUserList);
      } else {
        const response = await getAllUsers();
        const newUserList = response.data.data;

        setUsersList(newUserList);
      }
      setIsLoading(false);
    };
    const timeOutId = setTimeout(() => handleSearch(), 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [keywords]);

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 8px 2px 12px',
        marginRight: 'auto',
        width: '100%',
        maxWidth: '24rem',
      }}>
      <InputBase
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        placeholder="Buscar usuario..."
        sx={{ width: '100%' }}
        type="search"
        value={keywords}
        onChange={(e) => handleChange(e)}
      />
    </Paper>
  );
};

export default UsersSearchForm;
