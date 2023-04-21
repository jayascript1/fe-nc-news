import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Article from "./components/Article";
import "./App.css";

function App() {
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <main className="App">
      <Router>
        <Header />
        <Navbar handleTopicChange={handleTopicChange} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home selectedTopic={selectedTopic} />} />
            <Route path="/articles/:articleId" element={<Article />} />
          </Routes>
        </div>
      </Router>
    </main>
  );
}

export default App;
