import React, { useState, useEffect } from 'react';
import '../css/Header.css';
import userIcon from '../images/userIcon.png'

const Header = () => {
    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date())
        }, 60000);

        return () => {
            clearInterval(timer)
        }
    }, [])

    const formattedDate = currentDate.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

  return (
    <header className="header">
        <section>
            <h1>NC News</h1>
        </section>
        <div className="date">{formattedDate}</div>
      <div className="header_search">
        <input
          type="text"
          className="header_search-input"
          placeholder="Search for news"
        />
        <button className="header_search-button">Search</button>
      </div>
      <div className="header_user_logo">
        {/* Replace with your logo */}
        <img className='user_icon' src={userIcon} alt="User Logo" />
      </div>
    </header>
  );
};

export default Header;
