import axios from 'axios';
import { errorAlert } from './alertsService';

const TESTIMONIALS_URL = process.env.REACT_APP_TESTIMONIALS_URL;

export const createOrEditTestimonial = (id, body) => {
  if (id) {
    const response = updateTestimonial(id, body);

    return response;
  } else {
    const response = createTestimonial(body);

    return response;
  }
};

const createTestimonial = async (body) => {
  try {
    await axios.post(TESTIMONIALS_URL, body);
  } catch (err) {
    return errorAlert();
  }
};
const updateTestimonial = async (id, body) => {
  try {
    await axios.patch(`${TESTIMONIALS_URL}/${id}`, body);
  } catch {
    return errorAlert();
  }
};

export const deleteTestimonial = async (id) => {
  try {
    const response = await axios.delete(`${TESTIMONIALS_URL}/${id}`);

    return response;
  } catch {
    return errorAlert();
  }
};

export const getAllTestimonials = async () => {
  try {
    const response = await axios.get(TESTIMONIALS_URL);

    return response;
  } catch {
    return errorAlert();
  }
};

export const getTestimonial = async (id) => {
  try {
    const response = await axios.get(`${TESTIMONIALS_URL}/${id}`);

    return response;
  } catch {
    return errorAlert();
  }
};
