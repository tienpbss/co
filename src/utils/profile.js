import axios from "axios";
import { BASE_URL } from "src/constants";
import { getAuthorizationHeader } from 'src/common';

export const unFollowProfile = async (username) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const res = await axios.delete(`${BASE_URL}/profiles/${username}/follow`, {
    headers: {
      Authorization: getAuthorizationHeader(currentUser),
    },
  });
  const data = res.data;
  const { profile } = data;
  return profile;
};

export const followProfile = async (username) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(`${BASE_URL}/profiles/${username}/follow`, {}, {
    headers: {
      Authorization: getAuthorizationHeader(currentUser),
    },
  });
  const data = res.data;
  const { profile } = data;
  return profile;
};
