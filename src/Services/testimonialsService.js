import axios from 'axios';

const GET_TESTIMONIAL_URL = process.env.REACT_APP_GET_TESTIMONIAL;
const GET_ALL_TESTIMONIALS_URL = process.env.REACT_APP_GET_ALL_TESTIMONIALS;
const POST_TESTIMONIAL_URL = process.env.REACT_APP_POST_TESTIMONIAL;
const UPDATE_TESTIMONIAL_URL = process.env.REACT_APP_UPDATE_TESTIMONIAL;
const DELETE_TESTIMONIAL_URL = process.env.REACT_APP_DELETE_TESTIMONIAL;

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
  await axios.post(POST_TESTIMONIAL_URL, body);

const updateTestimonial = async (id, body) =>
  await axios.patch(`${UPDATE_TESTIMONIAL_URL}/${id}`, body);
