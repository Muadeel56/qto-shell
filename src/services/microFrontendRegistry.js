import React from 'react';
import { Calendar, Users, BarChart3, Handshake } from 'lucide-react';

// Micro-frontend registry and loader service
export const microFrontendRegistry = {
  attendance: {
    name: 'Attendance Portal',
    icon: () => <Calendar size={20} />,
    url: 'https://portal.qto.company', // Development URL
    productionUrl: 'https://portal.qto.company',
    description: 'Employee attendance tracking and management',
    isActive: true,
    permissions: ['attendance.view', 'attendance.manage']
  },
  hrm: {
    name: 'Human Resource Management',
    icon: () => <Users size={20} />,
    url: 'http://localhost:3002',
    productionUrl: 'https://hrm.qto.com',
    description: 'Employee management and HR processes',
    isActive: true,
    permissions: ['hrm.view', 'hrm.manage']
  },
  'project-management': {
    name: 'Project Management',
    icon: () => <BarChart3 size={20} />,
    url: 'https://qtohouse.com',
    productionUrl: 'https://qtohouse.com',
    description: 'Project tracking and task management',
    isActive: true,
    permissions: ['projects.view', 'projects.manage']
  },
  crm: {
    name: 'Customer Relationship Management',
    icon: () => <Handshake size={20} />,
    url: 'http://localhost:3004',
    productionUrl: 'https://crm.qto.com',
    description: 'Customer management and sales tracking',
    isActive: true,
    permissions: ['crm.view', 'crm.manage']
  }
};

// Get micro-frontend configuration
export const getMicroFrontend = (id) => {
  return microFrontendRegistry[id];
};

// Get all active micro-frontends
export const getActiveMicroFrontends = () => {
  return Object.entries(microFrontendRegistry)
    .filter(([_, config]) => config.isActive)
    .map(([id, config]) => ({ id, ...config }));
};

// Load micro-frontend
export const loadMicroFrontend = (id) => {
  const config = getMicroFrontend(id);
  if (!config) {
    throw new Error(`Micro-frontend '${id}' not found`);
  }
  
  const isDevelopment = process.env.NODE_ENV === 'development';
  const url = isDevelopment ? config.url : config.productionUrl;
  
  return {
    ...config,
    url,
    loadUrl: `${url}/static/js/main.js` // Adjust based on your build setup
  };
};

// Check if user has permission to access micro-frontend
export const hasPermission = (microFrontendId, userPermissions = []) => {
  const config = getMicroFrontend(microFrontendId);
  if (!config) return false;
  
  return config.permissions.some(permission => 
    userPermissions.includes(permission)
  );
};
