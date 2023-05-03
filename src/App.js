import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Article from "./components/Article";
import { fetchArticles } from "./api";
import { fetchCommentsById } from "./api";
import { fetchCommentCount } from "./api";
import "./App.css";

function App() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('desc');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchParams, setSearchParams] = useState([]);

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
  };

  const handleSortChange = async (event) => {
    const selectedSort = event.target.value;
    setSortBy(selectedSort);
    let newArticles = [];
    if (selectedSort === 'comment_count') {
      const articles = await fetchArticles('created_at', order);
      for (let article of articles) {
        const commentCount = await fetchCommentCount(article.article_id);
        newArticles.push({ ...article, comment_count: commentCount });
      }
      newArticles.sort((a, b) => b.comment_count - a.comment_count);
      setFilteredArticles(newArticles);
      setSearchParams({ sort_by: 'created_at', order: order });
    } else {
      newArticles = await fetchArticles(selectedSort, order);
      setFilteredArticles(newArticles);
      setSearchParams({ sort_by: selectedSort, order: order });
    }
  };
  
  
  
  
  const handleOrderChange = async (event) => {
    const newOrder = event.target.checked ? 'asc' : 'desc';
    setOrder(newOrder);
    if (sortBy === 'comment_count') {
      setSortBy('created_at')
    }
    const newArticles = await fetchArticles(sortBy, newOrder);
    setFilteredArticles(newArticles);
    setSearchParams({ sort_by: sortBy, order: newOrder });
  };

  return (
    <main className="App">
      <Router>
        <Header />
        <Navbar
          handleTopicChange={handleTopicChange}
          handleSortChange={handleSortChange}
          handleOrderChange={handleOrderChange}
        />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Home selectedTopic={selectedTopic} sortBy={sortBy} order={order} />}
            />
            <Route path="/articles/:articleId" element={<Article />} />
          </Routes>
        </div>
      </Router>
    </main>
  );
}


export default App;
