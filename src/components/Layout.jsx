import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MicroFrontendLoader from './MicroFrontendLoader';
import './Layout.css';

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMicroFrontend, setActiveMicroFrontend] = useState(null);

  const handleMicroFrontendChange = (microFrontendId) => {
    setActiveMicroFrontend(microFrontendId);
  };

  const handleMicroFrontendError = (error) => {
    console.error('Micro-frontend loading error:', error);
    // You can add error handling here, like showing a toast notification
  };

  return (
    <div className="layout">
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeMicroFrontend={activeMicroFrontend}
        onMicroFrontendChange={handleMicroFrontendChange}
      />
      <div className={`layout-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header sidebarCollapsed={sidebarCollapsed} />
        <main className="main-content">
          {activeMicroFrontend ? (
            <MicroFrontendLoader 
              microFrontendId={activeMicroFrontend}
              onError={handleMicroFrontendError}
            />
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
