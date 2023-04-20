import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById, fetchCommentsById } from '../api';
import '../css/Article.css';

function Article() {
  const { articleId } = useParams();
  const [article, setArticle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const articleData = await fetchArticleById(articleId);
        setArticle(articleData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
        setIsLoading(false);
      }
    };

    const getComments = async () => {
      try {
        const commentData = await fetchCommentsById(articleId);
        setComments(commentData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    getArticle();
    getComments();
  }, [articleId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <img className='article-image' src={article.article_img_url} alt={article.title} />
      <p className='article-body'>
      <p>Author: {article.author}</p>
      <p className='date'>Created at: {new Date(article.created_at).toLocaleString()}</p>
      <p>Votes: {article.votes}</p>
      <p>{article.body}</p>
      {comments.map((comment) => (
        <div key={comment.comment_id}>
          <p>{comment.body}</p>
          <p>Author: {comment.author}</p>
          <p>Created at: {new Date(comment.created_at).toLocaleString()}</p>
          <p>Votes: {comment.votes}</p>
        </div>
      ))}
      </p>
    </div>
  );
}

export default Article;
