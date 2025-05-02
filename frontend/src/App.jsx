import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Quiz from './Components/Quiz';
import Results from './Components/Results';
import './App.css'; // Import global styles

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('isDarkMode') === 'true'
  );

  // Toggle the theme mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('isDarkMode', newMode); // Persist theme preference
      return newMode;
    });
  };

  useEffect(() => {
    // This will apply the dark or light theme across the entire app based on the state
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
    } else {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="App">
        {/* Toggle Button for Light/Dark Mode */}
        <button className="theme-toggle-btn" onClick={toggleDarkMode}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
