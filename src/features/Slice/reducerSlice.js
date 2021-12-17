import * as slidesServices from '../../Services/slidesService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const slidesInitialState = {
  loading: false,
  data: [],
  error: '',
  currentSlide: {},
};

export const getAll = createAsyncThunk(
  'slides/getAll',
  slidesServices.getAllSlides,
);

export const create = createAsyncThunk(
  'slides/create',
  slidesServices.createSlide,
);

export const update = createAsyncThunk(
  'slides/update',
  slidesServices.updateSlide,
);

export const getById = createAsyncThunk(
  'slides/getById',
  slidesServices.getSlide,
);

export const deleteSlides = createAsyncThunk(
  'slides/deleteSlides',
  slidesServices.deleteSlide,
);

const slidesSlice = createSlice({
  name: 'slides',
  initialState: slidesInitialState,
  extraReducers: {
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [getAll.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [create.pending]: (state) => {
      state.loading = true;
    },
    [create.fulfilled]: (state, action) => {
      state.data = [...state.slides, action.payload];
      state.loading = false;
    },
    [create.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [update.pending]: (state) => {
      state.loading = true;
    },
    [update.fulfilled]: (state, action) => {
      state.data = state.data.map((slide) => {
        if (slide.id === action.payload.id) {
          return action.payload;
        }

        return slide;
      });
      state.loading = false;
    },
    [update.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getById.pending]: (state) => {
      state.loading = true;
    },
    [getById.fulfilled]: (state, action) => {
      state.currentSlide = action.payload;
      state.loading = false;
    },
    [getById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [deleteSlides.pending]: (state) => {
      state.loading = true;
    },
    [deleteSlides.fulfilled]: (state, action) => {
      (state.data = state.data.filter(
        (slide) => slide.id !== action.meta.arg.id,
      )),
        (state.loading = false);
    },
    [deleteSlides.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default slidesSlice.reducer;
