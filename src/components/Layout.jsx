import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MicroFrontendLoader from './MicroFrontendLoader';
import { getMicroFrontend, getChildMicroFrontend } from '../services/microFrontendRegistry.jsx';
import './Layout.css';

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMicroFrontend, setActiveMicroFrontend] = useState(null);
  const [activeParentMicroFrontend, setActiveParentMicroFrontend] = useState(null);

  const handleMicroFrontendChange = (microFrontendId, parentId = null) => {
    setActiveMicroFrontend(microFrontendId);
    setActiveParentMicroFrontend(parentId);
  };

  const handleMicroFrontendError = (error) => {
    console.error('Micro-frontend loading error:', error);
    // You can add error handling here, like showing a toast notification
  };

  // Get the active micro-frontend configuration
  const activeMicroFrontendConfig = activeMicroFrontend 
    ? (activeParentMicroFrontend 
        ? getChildMicroFrontend(activeParentMicroFrontend, activeMicroFrontend)
        : getMicroFrontend(activeMicroFrontend)
      )
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
          parentMicroFrontend={activeParentMicroFrontend}
        />
        <main className="main-content">
          {activeMicroFrontend ? (
            <MicroFrontendLoader 
              microFrontendId={activeMicroFrontend}
              parentId={activeParentMicroFrontend}
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
