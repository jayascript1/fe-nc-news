import React, {useState} from 'react';
import { Link, } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  const [, setSelectedTopic] = useState('');

  const handleHomeClick = async () => {
    setSelectedTopic('');
  };
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" onClick={handleHomeClick}>Home</Link>
      </div>
    </nav>
  );
}

export default Navbar;
