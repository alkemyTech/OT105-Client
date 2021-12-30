import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {
  getAllActivities,
  getActivitiesByKeyword,
} from '../../Services/activitiesService';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      console.log(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const ActivitiesSearchForm = ({
  updateActivitiesList,
  // updateLoadingState,
}) => {
  const [keywords, setKeywords] = useState('');

  const handleChange = (e) => {
    setKeywords(e.target.value);
  };

  const debouncedValue = useDebounce(keywords, 500);

  useEffect(() => {
    // updateLoadingState(true);
    if (debouncedValue.length < 3) {
      getAllActivities().then((res) => {
        updateActivitiesList(res);
        // updateLoadingState(false);
      });
    } else {
      getActivitiesByKeyword(keywords).then((res) => {
        updateActivitiesList(res);
        // updateLoadingState(false);
      });
    }
  }, [debouncedValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeywords(e.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        margin: '1rem',
      }}
      onSubmit={(e) => handleSubmit(e)}>
      <InputBase
        placeholder="Buscar actividades..."
        sx={{ ml: 1, flex: 1 }}
        onChange={(e) => handleChange(e)}
      />
      <Divider orientation="vertical" sx={{ height: 28, m: 0.5 }} />
      <IconButton aria-label="search" sx={{ p: '10px' }} type="submit">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default ActivitiesSearchForm;
