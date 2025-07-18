import React, { useState, useEffect, useRef } from 'react';
import { loadMicroFrontend, getMicroFrontend, getChildMicroFrontend } from '../services/microFrontendRegistry.jsx';
import './MicroFrontendLoader.css';

const MicroFrontendLoader = ({ microFrontendId, parentId, onError }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  
  // Get micro frontend config for display name
  const microFrontendConfig = microFrontendId 
    ? (parentId 
        ? getChildMicroFrontend(parentId, microFrontendId)
        : getMicroFrontend(microFrontendId)
      )
    : null;

  useEffect(() => {
    if (!microFrontendId) {
      setLoading(false);
      return;
    }

    const loadApp = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const config = loadMicroFrontend(microFrontendId, parentId);
        
        // Clear previous content
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // For development, you might use iframe approach
        // For production, you'd use module federation or single-spa
        if (import.meta.env.DEV) {
          // Create iframe for development
          const iframe = document.createElement('iframe');
          iframe.src = config.url;
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.border = 'none';
          iframe.style.borderRadius = '8px';
          
          // Add responsive styling for mobile
          const mediaQuery = window.matchMedia('(max-width: 768px)');
          const handleMediaChange = (e) => {
            if (e.matches) {
              iframe.style.borderRadius = '4px';
            } else {
              iframe.style.borderRadius = '8px';
            }
          };
          
          // Apply initial styles
          handleMediaChange(mediaQuery);
          
          // Listen for changes
          mediaQuery.addListener(handleMediaChange);
          
          if (containerRef.current) {
            containerRef.current.appendChild(iframe);
          }
        } else {
          // In production, load the micro-frontend module
          // This would be replaced with actual module federation logic
          const script = document.createElement('script');
          script.src = config.loadUrl;
          script.onload = () => {
            // Initialize the micro-frontend
            if (window[`${microFrontendId}App`]) {
              window[`${microFrontendId}App`].mount(containerRef.current);
            }
          };
          document.head.appendChild(script);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        onError?.(err);
      }
    };

    loadApp();
  }, [microFrontendId, onError]);

  if (loading) {
    return (
      <div className="micro-frontend-loader">
        <div className="loader-spinner"></div>
        <p>Loading {microFrontendConfig?.name || microFrontendId}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="micro-frontend-error">
        <h3>Failed to load {microFrontendConfig?.name || 'application'}</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="micro-frontend-container" ref={containerRef}>
      {!microFrontendId && (
        <div className="micro-frontend-placeholder">
          <h2>Welcome to QTO Shell</h2>
          <p>Select an application from the sidebar to get started.</p>
        </div>
      )}
    </div>
  );
};

export default MicroFrontendLoader;
