import React from 'react';
import TextField from '@mui/material/TextField';

const CategoriesSearchForm = () => {
  const handleChange = (e) => {
    if (e.target.value.length > 2) {
      console.log('Busqueda por termino');
    } else {
      console.log('Busqueda generica');
    }
  };

  const debounceFn = (fn) => {
    let timeoutId;

    return function () {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const context = this;
      const args = arguments;

      timeoutId = setTimeout(() => {
        fn.apply(context, args);
      }, 500);
    };
  };

  const debouncedHandleChange = debounceFn(handleChange);

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Buscar categoria"
        variant="outlined"
        onChange={debouncedHandleChange}
      />
    </div>
  );
};

export default CategoriesSearchForm;
