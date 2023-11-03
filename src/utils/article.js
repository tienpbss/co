import axios from "axios";
import { BASE_URL } from "src/constants";

export const favoriteArticle = async (slug) => {
  const res = await axios.post(`${BASE_URL}/articles/${slug}/favorite`);
  const data = res.data;
  const { article } = data;
  return article;
};

export const unFavoriteArticle = async (slug) => {
  const res = await axios.delete(`${BASE_URL}/articles/${slug}/favorite`);
  const data = res.data;
  const { article } = data;
  return article;
};

export const deleteArticle = async (slug) => {
  await axios.delete(`${BASE_URL}/articles/${slug}`);
};
