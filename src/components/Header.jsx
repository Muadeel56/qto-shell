import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <img src={logo} alt="QTO Logo" className="logo" />
          <span className="logo-text">QTO House</span>
        </div>
        
        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home" className="nav-link" onClick={closeMobileMenu}>Home</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link" onClick={closeMobileMenu}>About</a>
            </li>
            <li className="nav-item">
              <a href="#services" className="nav-link" onClick={closeMobileMenu}>Services</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link" onClick={closeMobileMenu}>Contact</a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button 
            className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
