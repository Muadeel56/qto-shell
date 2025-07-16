import React, { useState } from 'react';
import { Home, Bell, MessageCircle, User, Search } from 'lucide-react';
import './Header.css';

const Header = ({ sidebarCollapsed = false, activeMicroFrontend = null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Determine what to show in the header title
  const getHeaderTitle = () => {
    if (activeMicroFrontend) {
      return {
        title: activeMicroFrontend.name,
        subtitle: activeMicroFrontend.description,
        icon: activeMicroFrontend.icon(),
        breadcrumbs: ['QTO House', activeMicroFrontend.name]
      };
    }
    return {
      title: 'QTO Design System',
      subtitle: 'Dashboard',
      icon: <Home size={24} />,
      breadcrumbs: ['QTO House', 'Dashboard']
    };
  };

  const headerInfo = getHeaderTitle();

  return (
    <header className={`header ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="header-container">
        <div className="header-title">
          <div className="header-title-main">
            <span className="header-icon">{headerInfo.icon}</span>
            <div className="header-text">
              <div className="header-breadcrumbs">
                {headerInfo.breadcrumbs.map((crumb, index) => (
                  <span key={index}>
                    <span className="breadcrumb-item">{crumb}</span>
                    {index < headerInfo.breadcrumbs.length - 1 && (
                      <span className="breadcrumb-separator">›</span>
                    )}
                  </span>
                ))}
              </div>
              <h4>{headerInfo.title}</h4>
              <span className="header-subtitle">{headerInfo.subtitle}</span>
            </div>
          </div>
        </div>
        
        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#notifications" className="nav-link" onClick={closeMobileMenu}>
                <span className="nav-icon">
                  <Bell size={18} />
                </span>
                Notifications
              </a>
            </li>
            <li className="nav-item">
              <a href="#messages" className="nav-link" onClick={closeMobileMenu}>
                <span className="nav-icon">
                  <MessageCircle size={18} />
                </span>
                Messages
              </a>
            </li>
            <li className="nav-item">
              <a href="#profile" className="nav-link" onClick={closeMobileMenu}>
                <span className="nav-icon">
                  <User size={18} />
                </span>
                Profile
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="search-btn" aria-label="Search">
            <Search size={18} />
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
