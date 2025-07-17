import React, { useState, useEffect } from 'react';
import { Home, Settings, User, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import logo from '../assets/logo.svg';
import { getHierarchicalMicroFrontends } from '../services/microFrontendRegistry.jsx';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, onToggle, activeMicroFrontend, onMicroFrontendChange }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState(new Set(['hrm'])); // HR Management expanded by default

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
  const microFrontends = getHierarchicalMicroFrontends();

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleMicroFrontendClick = (microFrontendId, parentId = null) => {
    onMicroFrontendChange(microFrontendId, parentId);
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
              <React.Fragment key={mf.id}>
                <li className="sidebar-menu-item">
                  {mf.isParent ? (
                    // Parent item with children
                    <div>
                      <button
                        className={`sidebar-menu-link sidebar-parent-link ${
                          mf.children?.some(child => activeMicroFrontend === child.id) ? 'has-active-child' : ''
                        }`}
                        data-tooltip={mf.name}
                        onClick={() => {
                          if (isCollapsed && !isMobile) {
                            // In collapsed mode, expand the item
                            toggleExpanded(mf.id);
                          } else {
                            // In normal mode, toggle expansion
                            toggleExpanded(mf.id);
                          }
                        }}
                      >
                        <span className="sidebar-menu-icon">{mf.icon()}</span>
                        {(!isCollapsed || isMobile) && (
                          <>
                            <span className="sidebar-menu-text">{mf.name}</span>
                            <span className="sidebar-expand-icon">
                              {expandedItems.has(mf.id) ? (
                                <ChevronDown size={16} />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                            </span>
                          </>
                        )}
                      </button>
                      
                      {/* Child items */}
                      {(!isCollapsed || isMobile) && expandedItems.has(mf.id) && mf.children && (
                        <ul className="sidebar-submenu">
                          {mf.children.map((child) => (
                            <li key={child.id} className="sidebar-submenu-item">
                              <button
                                className={`sidebar-submenu-link ${activeMicroFrontend === child.id ? 'active' : ''}`}
                                data-tooltip={child.name}
                                onClick={() => handleMicroFrontendClick(child.id, mf.id)}
                              >
                                <span className="sidebar-submenu-icon">{child.icon()}</span>
                                <span className="sidebar-submenu-text">{child.name}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {/* Collapsed state tooltips for children */}
                      {isCollapsed && !isMobile && expandedItems.has(mf.id) && mf.children && (
                        <div className="sidebar-collapsed-submenu">
                          {mf.children.map((child) => (
                            <button
                              key={child.id}
                              className={`sidebar-collapsed-child ${activeMicroFrontend === child.id ? 'active' : ''}`}
                              data-tooltip={child.name}
                              onClick={() => handleMicroFrontendClick(child.id, mf.id)}
                            >
                              {child.icon()}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Regular menu item
                    <button
                      className={`sidebar-menu-link ${activeMicroFrontend === mf.id ? 'active' : ''}`}
                      data-tooltip={mf.name}
                      onClick={() => handleMicroFrontendClick(mf.id)}
                    >
                      <span className="sidebar-menu-icon">{mf.icon()}</span>
                      {(!isCollapsed || isMobile) && <span className="sidebar-menu-text">{mf.name}</span>}
                    </button>
                  )}
                </li>
              </React.Fragment>
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
