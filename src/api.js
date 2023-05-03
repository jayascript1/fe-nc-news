import axios from 'axios';


const api = axios.create({
  baseURL: 'https://north-news.onrender.com/api',
});

export const fetchArticles = async (sort_by, order) => {
  const response = await api.get('/articles', {
    params: {
      sort_by: sort_by,
      order: order,
    },
  });
  return response.data.articles;
};

export const fetchCommentCount = async (id) => {
  const response = await api.get(`articles/${id}`);
  return response.data.comment_count
}

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

export const fetchTopics = async () => {
  const response = await api.get('/topics');
  return response.data.topics;
};

export const fetchArticlesByTopic = async (topic, sortBy, order) => {
  const response = await api.get('/articles', {
    params: {
      topic: topic || undefined,
      sort_by: sortBy || undefined,
      order: order || undefined,
    },
  });
  return response.data.articles;
};


