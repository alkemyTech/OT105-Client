import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
  try {
    const response = await axios.get('http://ongapi.alkemy.org/api/users');

    return response.data.data;
  } catch (err) {
    return console.log(err);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllUsers.pending, (state, _action) => {
      state.status = 'loading';
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.list = state.list.concat(action.payload);
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;

export const selectAllUsers = (state) => state.users.list;
