import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import membersReducer from '../features/members/membersSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    members: membersReducer,
  },
});
