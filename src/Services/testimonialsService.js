import axios from 'axios';

export const testimonialFormService = async (id, body) => {
  if (id) {
    const resp = await axios.patch(
      'http://ongapi.alkemy.org/api/testimonials/',
      body,
    );

    return resp;
  } else {
    const resp = await axios.post(
      `http://ongapi.alkemy.org/api/testimonials/${id}`,
      body,
    );

    return resp;
  }
};
