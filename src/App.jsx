import React from 'react';
import { Layout } from './components';
const Button = React.lazy(() => import('qto_theme/Button'));

function App() {
  return (
    <Layout>
      <div style={{ padding: '1rem' }}>
        <Button>Button</Button>
        <h1>Welcome to QTO Design System</h1>
        <p>This is the main content area. The sidebar is on the left and the header is at the top.</p>
        
        <div style={{ marginTop: '2rem' }}>
          <h2>Features</h2>
          <ul>
            <li>✅ Fully responsive sidebar with logo</li>
            <li>✅ Collapsible sidebar on desktop</li>
            <li>✅ Mobile-friendly hamburger menu</li>
            <li>✅ Clean header that starts after sidebar</li>
            <li>✅ Smooth animations and transitions</li>
            <li>✅ Professional dark theme sidebar</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default App;