import axios from 'axios';

const getAllMembers = async () => {
  try {
    const res = await axios.get(process.env.REACT_APP_GET_MIEMBROS_ALL);

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const getMemberById = async (memberId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_GET_MIEMBROS_ID}/${memberId}`,
    );

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const createMember = async (member) => {
  try {
    const res = await axios.post(process.env.REACT_APP_POST_MIEMBROS, member);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const editMember = async (memberId, editedMember) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_PUT_MIEMBROS_ID}/${memberId}`,
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
      `${process.env.REACT_APP_DELETE_MIEMBROS_ID}/${memberId}`,
    );

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export { getAllMembers, getMemberById, createMember, editMember, deleteMember };
