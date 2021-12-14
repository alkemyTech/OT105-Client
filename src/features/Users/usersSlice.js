import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
  },
  reducers: {
    setUserList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setUserList } = userSlice.actions;

export default userSlice.reducer;

// export const getAllUsers = () => (dispatch) => {
//   axios
//     .get('http://ongapi.alkemy.org/api/users')
//     .then((response) => {
//       dispatch(setUserList(response.data.data));
//       console.log(response.data.data);
//     })
//     .catch((error) => console.log(error));
// };
export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (dispatch) => {
    axios
      .get('http://ongapi.alkemy.org/api/users')
      .then((response) => {
        dispatch(setUserList(response.data.data));
        console.log(response.data.data);
      })
      .catch((error) => console.log(error));
  },
);
