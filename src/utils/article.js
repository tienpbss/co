import axios from "axios";
import { BASE_URL } from "src/constants";
import { getAuthorizationHeader } from 'src/common';

export const favoriteArticle = async (slug) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(`${BASE_URL}/articles/${slug}/favorite`, {
    headers: {
      Authorization: getAuthorizationHeader(currentUser),
    },
  });
  const data = res.data;
  const { article } = data;
  return article;
};

export const unFavoriteArticle = async (slug) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const res = await axios.delete(`${BASE_URL}/articles/${slug}/favorite`, {
    headers: {
      Authorization: getAuthorizationHeader(currentUser),
    },
  });
  const data = res.data;
  const { article } = data;
  return article;
};

export const deleteArticle = async (slug) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  await axios.delete(`${BASE_URL}/articles/${slug}`, {
    headers: {
      Authorization: getAuthorizationHeader(currentUser),
    },
  });
};
