import axios from 'axios';

const ORGANIZATION_URL = process.env.REACT_APP_GET_ORGANIZATION;

const getWelcomeMessage = async () => {
  try {
    const response = await axios(ORGANIZATION_URL);
    const welcomeText = response.data.data.welcome_text;

    return welcomeText;
  } catch (err) {
    return err.response.data;
  }
};

export { getWelcomeMessage };
