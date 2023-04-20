import axios from 'axios';

const api = axios.create({
  baseURL: 'https://north-news.onrender.com/api',
});

export const fetchArticles = async () => {
  const response = await api.get('/articles', {
  });
  return response.data.articles;
};

export const fetchArticleById = async (id) => {
  const response = await api.get(`/articles/${id}`);
  return response.data;
};
