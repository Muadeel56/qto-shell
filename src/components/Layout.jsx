import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MicroFrontendLoader from './MicroFrontendLoader';
import { getMicroFrontend } from '../services/microFrontendRegistry.jsx';
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

  // Get the active micro-frontend configuration
  const activeMicroFrontendConfig = activeMicroFrontend 
    ? getMicroFrontend(activeMicroFrontend)
    : null;

  return (
    <div className="layout">
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeMicroFrontend={activeMicroFrontend}
        onMicroFrontendChange={handleMicroFrontendChange}
      />
      <div className={`layout-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header 
          sidebarCollapsed={sidebarCollapsed}
          activeMicroFrontend={activeMicroFrontendConfig}
        />
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
