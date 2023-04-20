import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../api';
import '../css/Home.css';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchAndSetArticles() {
      const fetchedArticles = await fetchArticles();
      setArticles(fetchedArticles);
    }
  
    fetchAndSetArticles();
  }, []);
  

  return (
    <div className="Home">
      <div className="article-grid">
        {articles.map((article) => (
          <Link key={article.article_id} to={`/articles/${article.article_id}`}>
            <div className="article-card">
              <img src={article.article_img_url} alt={article.title} />
              <h3>{article.title}</h3>
              <p>Created at: {new Date(article.created_at).toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
