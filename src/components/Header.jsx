import React, { useState } from 'react';
import './Header.css';

const Header = ({ sidebarCollapsed = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="header-container">
        <div className="header-title">
          <h4>QTO Design System</h4>
        </div>
        
        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#notifications" className="nav-link" onClick={closeMobileMenu}>
                <span className="nav-icon">🔔</span>
                Notifications
              </a>
            </li>
            <li className="nav-item">
              <a href="#messages" className="nav-link" onClick={closeMobileMenu}>
                <span className="nav-icon">💬</span>
                Messages
              </a>
            </li>
            <li className="nav-item">
              <a href="#profile" className="nav-link" onClick={closeMobileMenu}>
                <span className="nav-icon">👤</span>
                Profile
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="search-btn" aria-label="Search">
            🔍
          </button>
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
