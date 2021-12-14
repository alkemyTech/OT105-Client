import axios from 'axios';

const getAllMembers = async () => {
  try {
    const res = await axios.get(process.env.REACT_APP_MEMBERS_URL);

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const getMemberById = async (memberId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_MEMBERS_URL}/${memberId}`,
    );

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const createMember = async (member) => {
  try {
    const res = await axios.post(process.env.REACT_APP_MEMBERS_URL, member);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const editMember = async (memberId, editedMember) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_MEMBERS_URL}/${memberId}`,
      editedMember,
    );

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const deleteMember = async (memberId) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_MEMBERS_URL}/${memberId}`,
    );

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export { getAllMembers, getMemberById, createMember, editMember, deleteMember };
