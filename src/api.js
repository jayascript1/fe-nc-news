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

export const fetchCommentsById = async (id) => {
  const response = await api.get(`/articles/${id}/comments`);
  return response.data.comments;
};

export const voteOnArticle = async (id, increment) => {
  const response = await api.patch(`/articles/${id}`, {
    inc_votes: increment,
  });
  return response.data;
};