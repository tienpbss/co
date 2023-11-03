import axios from "axios";
import { BASE_URL } from "src/constants";

export const unFollowProfile = async (username) => {
  const res = await axios.delete(`${BASE_URL}/profiles/${username}/follow`);
  const data = res.data;
  const { profile } = data;
  return profile;
};

export const followProfile = async (username) => {
  const res = await axios.post(`${BASE_URL}/profiles/${username}/follow`);
  const data = res.data;
  const { profile } = data;
  return profile;
};
