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

export const postComment = async (articleId, body, currentUser) => {
  try {
    const payload = {
      body,
      username: currentUser.username,
      created_at: new Date().toISOString(),
      votes: 0,
    };
    const response = await api.post(`/articles/${articleId}/comments`, payload);
    return response.data.comment;
  } catch (error) {
    console.error('Error posting comment:', error.response.data);
    throw error;
  }
};

