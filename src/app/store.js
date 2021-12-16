import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import membersReducer from '../features/members/membersSlice';
import usReducer from '../features/us/usSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    members: membersReducer,
    us: usReducer,
  },
});
