import React, { useState } from 'react';
import { Home, Settings, User } from 'lucide-react';
import logo from '../assets/logo.svg';
import { getActiveMicroFrontends } from '../services/microFrontendRegistry.jsx';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, onToggle, activeMicroFrontend, onMicroFrontendChange }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Get micro-frontends from registry
  const microFrontends = getActiveMicroFrontends();

  const handleMicroFrontendClick = (microFrontendId) => {
    onMicroFrontendChange(microFrontendId);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="sidebar-overlay"
          onClick={toggleMobileSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo Section */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={logo} alt="QTO Logo" className="sidebar-logo-img" />
            {!isCollapsed && <span className="sidebar-logo-text">QTO House</span>}
          </div>
          
          {/* Toggle Button for Desktop */}
          <button 
            className="sidebar-toggle desktop-toggle"
            onClick={onToggle}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span className={`toggle-icon ${isCollapsed ? 'collapsed' : ''}`}>
              ◀
            </span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {/* Dashboard/Home */}
            <li className="sidebar-menu-item">
              <button
                className={`sidebar-menu-link ${activeMicroFrontend === null ? 'active' : ''}`}
                data-tooltip="Dashboard"
                onClick={() => handleMicroFrontendClick(null)}
              >
                <span className="sidebar-menu-icon">
                  <Home size={20} />
                </span>
                {!isCollapsed && <span className="sidebar-menu-text">Dashboard</span>}
              </button>
            </li>
            
            {/* Separator */}
            <li className="sidebar-separator">
              {!isCollapsed && <span>Applications</span>}
            </li>
            
            {/* Micro-frontends */}
            {microFrontends.map((mf) => (
              <li key={mf.id} className="sidebar-menu-item">
                <button
                  className={`sidebar-menu-link ${activeMicroFrontend === mf.id ? 'active' : ''}`}
                  data-tooltip={mf.name}
                  onClick={() => handleMicroFrontendClick(mf.id)}
                >
                  <span className="sidebar-menu-icon">{mf.icon()}</span>
                  {!isCollapsed && <span className="sidebar-menu-text">{mf.name}</span>}
                </button>
              </li>
            ))}
            
            {/* Separator */}
            <li className="sidebar-separator">
              {!isCollapsed && <span>Settings</span>}
            </li>
            
            {/* Settings */}
            <li className="sidebar-menu-item">
              <button
                className="sidebar-menu-link"
                data-tooltip="Settings"
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="sidebar-menu-icon">
                  <Settings size={20} />
                </span>
                {!isCollapsed && <span className="sidebar-menu-text">Settings</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {!isCollapsed && (
            <div className="sidebar-user">
              <div className="user-avatar">
                <User size={18} />
              </div>
              <div className="user-info">
                <span className="user-name">Admin</span>
                <span className="user-role">Developer</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button 
        className="sidebar-toggle mobile-toggle"
        onClick={toggleMobileSidebar}
        aria-label="Toggle sidebar"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
    </>
  );
};

export default Sidebar;
