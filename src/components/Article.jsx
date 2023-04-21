import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById, fetchCommentsById } from '../api';
import '../css/Article.css';
import CommentList from './CommentList';

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
        setIsLoading(false);
      }
    };

    const getComments = async () => {
      try {
        const commentData = await fetchCommentsById(articleId);
        setComments(commentData);
      } catch (error) {
      }
    };

    getArticle();
    getComments();
  }, [articleId]);

  if (isLoading) {
    return <div className="loading-container">
      <p>Loading...</p></div>;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <img className='article-image' src={article.article_img_url} alt={article.title} />
      <p>Author: {article.author}</p>
      <p>Votes: {article.votes}</p>
      <p className='article-body'>{article.body}</p>
      <CommentList comments={comments} />
    </div>
  );
}

export default Article;
