import axios from 'axios';

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

const createTestimonial = async (body) =>
  await axios.post(TESTIMONIALS_URL, body);

const updateTestimonial = async (id, body) =>
  await axios.patch(`${TESTIMONIALS_URL}/${id}`, body);

export const deleteTestimonial = async (id) => {
  const response = await axios.delete(`${TESTIMONIALS_URL}/${id}`);

  return response;
};

export const getAllTestimonials = async () => {
  const response = await axios.get(TESTIMONIALS_URL);

  return response;
};

export const getTestimonial = async (id) => {
  const response = await axios.get(`${TESTIMONIALS_URL}/${id}`);

  return response;
};
