import React, { useState, useEffect } from 'react';
import '../css/Header.css';

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
        <div className="date">{formattedDate}</div>
        <section>
            <h1>NC News</h1>
        </section>
      <div className="header_search">
        <input
          type="text"
          className="header_search-input"
          placeholder="Search for news"
        />
        <button className="header_search-button">Search</button>
      </div>
    </header>
  );
};

export default Header;
