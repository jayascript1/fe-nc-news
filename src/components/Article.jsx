import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../api';
import '../css/Article.css';

function Article() {
  const { articleId } = useParams();
  const [article, setArticle] = useState('');

  useEffect(() => {
    const getArticle = async () => {
      try {
        const articleData = await fetchArticleById(articleId);
        setArticle(articleData);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    getArticle();
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <img className='article-image' src={article.article_img_url} alt={article.title} />
      <p>Author: {article.author}</p>
      <p className='date'>Created at: {new Date(article.created_at).toLocaleString()}</p>
      <p className='article-body'>{article.body}</p>
    </div>
  );
}

export default Article;
