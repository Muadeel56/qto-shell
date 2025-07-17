import React, { useState, useEffect, useRef } from 'react';
import { Home, Search, ChevronRight } from 'lucide-react';
import { getMicroFrontend } from '../services/microFrontendRegistry.jsx';
import ThemeToggle from '../../../qto-theme/src/components/ThemeToggle.jsx';
import './Header.css';

const Header = ({ sidebarCollapsed = false, activeMicroFrontend = null, parentMicroFrontend = null }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
        setSearchQuery('');
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isSearchExpanded) {
        setIsSearchExpanded(false);
        setSearchQuery('');
      }
    };

    if (isSearchExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isSearchExpanded]);

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      // Focus the search input when expanded
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    } else {
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search query:', searchQuery);
      // Implement search functionality here
      // Optionally close search after submit on mobile
      if (window.innerWidth <= 768) {
        setIsSearchExpanded(false);
      }
    }
  };

  // Determine what to show in the header title
  const getHeaderTitle = () => {
    if (activeMicroFrontend) {
      const breadcrumbs = ['QTO House'];
      
      // Add parent micro-frontend to breadcrumbs if exists
      if (parentMicroFrontend) {
        const parentConfig = getMicroFrontend(parentMicroFrontend);
        if (parentConfig) {
          breadcrumbs.push(parentConfig.name);
        }
      }
      
      breadcrumbs.push(activeMicroFrontend.name);
      
      return {
        title: activeMicroFrontend.name,
        subtitle: activeMicroFrontend.description,
        icon: activeMicroFrontend.icon(),
        breadcrumbs: breadcrumbs,
        isMicroFrontend: true
      };
    }
    return {
      title: 'QTO Design System',
      subtitle: 'Dashboard',
      icon: <Home size={24} />,
      breadcrumbs: ['QTO House', 'Dashboard'],
      isMicroFrontend: false
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
                  <span key={index} className="breadcrumb-container">
                    <span className="breadcrumb-item" title={crumb}>{crumb}</span>
                    {index < headerInfo.breadcrumbs.length - 1 && (
                      <ChevronRight size={14} className="breadcrumb-separator" />
                    )}
                  </span>
                ))}
              </div>
              <h4 
                className={`header-main-title ${headerInfo.isMicroFrontend ? 'micro-frontend-title' : ''}`}
                title={headerInfo.title}
              >
                {headerInfo.title}
              </h4>
              {!headerInfo.isMicroFrontend && (
                <span className="header-subtitle" title={headerInfo.subtitle}>
                  {headerInfo.subtitle}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="header-actions">
          <div className="header-search" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className={`search-form ${isSearchExpanded ? 'expanded' : ''}`}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button 
                type="button"
                className="search-toggle"
                onClick={handleSearchToggle}
                aria-label="Toggle search"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
          
          <div className="header-theme-toggle">
            <ThemeToggle size="sm" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
