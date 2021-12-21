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

const getOrganizationData = async () => {
  const response = await axios(ORGANIZATION_URL);
  const organizationName = response.data.data.name;

  return organizationName;
};

const editWelcomeMessage = async (welcomeMessage) => {
  const name = await getOrganizationData();
  const body = {
    name,
    welcome_text: welcomeMessage,
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_EDIT_ORGANIZATION}`,
      body,
    );

    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export { getWelcomeMessage, editWelcomeMessage };
