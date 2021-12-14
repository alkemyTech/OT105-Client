import axios from 'axios';

const MEMBERS_URL = 'http://ongapi.alkemy.org/api/members';

const getAllMembers = async () => {
  try {
    const res = await axios.get(MEMBERS_URL);

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const getMemberById = async (memberId) => {
  try {
    const res = await axios.get(`${MEMBERS_URL}/${memberId}`);

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const createMember = async (member) => {
  try {
    const res = await axios.post(MEMBERS_URL, member);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const editMember = async (memberId, editedMember) => {
  try {
    const res = await axios.put(`${MEMBERS_URL}/${memberId}`, editedMember);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const deleteMember = async (memberId) => {
  try {
    const res = await axios.delete(`${MEMBERS_URL}/${memberId}`);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export { getAllMembers, getMemberById, createMember, editMember, deleteMember };
