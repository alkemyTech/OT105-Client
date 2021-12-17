import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import slidesSlice from '../features/Slice/reducerSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    slice: slidesSlice,
  },
});
