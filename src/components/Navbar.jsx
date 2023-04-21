import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopics } from '../api';
import '../css/Navbar.css';

function Navbar({ handleTopicChange}) {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');

  useEffect(() => {
    const getTopics = async () => {
      try {
        const topicsData = await fetchTopics();
        setTopics(topicsData);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };
    getTopics();
  }, []);

  const handleHomeClick = async () => {
    setSelectedTopic('');
  };

  const handleChange = async (event) => {
    setSelectedTopic(event.target.value);
    handleTopicChange(event.target.value);
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" onClick={handleHomeClick}>Home</Link>
        <select className="topics-dropdown" onChange={handleChange} value={selectedTopic}>
          <option value="">Topics</option>
          {topics.map((topic) => (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}

export default Navbar;
