import React, { useState, useEffect } from 'react';
import { Home, Settings, User, Menu, X } from 'lucide-react';
import logo from '../assets/logo.svg';
import { getActiveMicroFrontends } from '../services/microFrontendRegistry.jsx';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, onToggle, activeMicroFrontend, onMicroFrontendChange }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Close mobile sidebar when switching to desktop
      if (!mobile && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileOpen]);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileOpen && !event.target.closest('.sidebar') && !event.target.closest('.mobile-toggle')) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileOpen]);

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Get micro-frontends from registry
  const microFrontends = getActiveMicroFrontends();

  const handleMicroFrontendClick = (microFrontendId) => {
    onMicroFrontendChange(microFrontendId);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className={`sidebar-toggle mobile-toggle ${isMobileOpen ? 'active' : ''}`}
        onClick={toggleMobileSidebar}
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className={`sidebar-overlay ${isMobileOpen ? 'active' : ''}`}
          onClick={toggleMobileSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed && !isMobile ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo Section */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-container">
              <img src={logo} alt="QTO Logo" className="sidebar-logo-img" />
              {(!isCollapsed || isMobile) && (
                <span className="sidebar-logo-text">QTO HOUSE</span>
              )}
            </div>
          </div>
          
          {/* Toggle Button for Desktop */}
          {!isMobile && (
            <button 
              className="sidebar-toggle desktop-toggle"
              onClick={onToggle}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <span className={`toggle-icon ${isCollapsed ? 'collapsed' : ''}`}>
                ◀
              </span>
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {/* Dashboard/Home */}
            <li className="sidebar-menu-item">
              <button
                className={`sidebar-menu-link ${activeMicroFrontend === null ? 'active' : ''}`}
                data-tooltip="Admin Dashboard"
                onClick={() => handleMicroFrontendClick(null)}
              >
                <span className="sidebar-menu-icon">
                  <Home size={20} />
                </span>
                {(!isCollapsed || isMobile) && <span className="sidebar-menu-text">Admin Dashboard</span>}
              </button>
            </li>
            
            {/* Separator */}
            {(!isCollapsed || isMobile) && microFrontends.length > 0 && (
              <li className="sidebar-separator">
                <span>Applications</span>
              </li>
            )}
            
            {/* Micro-frontends */}
            {microFrontends.map((mf) => (
              <li key={mf.id} className="sidebar-menu-item">
                <button
                  className={`sidebar-menu-link ${activeMicroFrontend === mf.id ? 'active' : ''}`}
                  data-tooltip={mf.name}
                  onClick={() => handleMicroFrontendClick(mf.id)}
                >
                  <span className="sidebar-menu-icon">{mf.icon()}</span>
                  {(!isCollapsed || isMobile) && <span className="sidebar-menu-text">{mf.name}</span>}
                </button>
              </li>
            ))}
            
            {/* Separator */}
            {(!isCollapsed || isMobile) && (
              <li className="sidebar-separator">
                <span>Settings</span>
              </li>
            )}
            
            {/* Settings */}
            <li className="sidebar-menu-item">
              <button
                className="sidebar-menu-link"
                data-tooltip="Settings"
                onClick={() => isMobile && setIsMobileOpen(false)}
              >
                <span className="sidebar-menu-icon">
                  <Settings size={20} />
                </span>
                {(!isCollapsed || isMobile) && <span className="sidebar-menu-text">Settings</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {(!isCollapsed || isMobile) && (
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
    </>
  );
};

export default Sidebar;
