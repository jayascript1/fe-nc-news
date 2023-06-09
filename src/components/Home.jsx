import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticlesByTopic } from '../api';
import { useAuth } from '../contexts/AuthContext';
import '../css/Home.css';

const Home = ({ selectedTopic, sortBy, order }) => {
  const [articles, setArticles] = useState([]);
  const { currentUser, login } = useAuth();

  useEffect(() => {
    async function fetchAndSetArticles() {
      if (sortBy === 'comment_count') {
        sortBy = 'created_at'
      }
      const fetchedArticles = await fetchArticlesByTopic(selectedTopic, sortBy, order);
      console.log(fetchedArticles)
      setArticles(fetchedArticles);
    }

    fetchAndSetArticles();
  }, [selectedTopic, sortBy, order]);

  useEffect(() => {
    async function fetchAndSetArticles() {
      const fetchedArticles = await fetchArticlesByTopic(selectedTopic);
      console.log(fetchedArticles)
      setArticles(fetchedArticles);
    }

    fetchAndSetArticles();
  }, [selectedTopic]);

  const handleLogin = (username) => {
    login(username);
  };

  return (
    <div className="Home">
      <div className='logins'>
        <button onClick={() => handleLogin('cooljmessy')}>Login as cooljmessy</button>
        <button onClick={() => handleLogin('weegembump')}>Login as weegembump</button>
        <button onClick={() => handleLogin('happyamy2016')}>Login as happyamy2016</button>
        {currentUser && <p>Logged in as: {currentUser.username}</p>}
      </div>
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
