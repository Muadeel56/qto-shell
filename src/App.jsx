import React from 'react';
import { Layout } from './components';
const Button = React.lazy(() => import('qto_theme/Button'));

function App() {
  return (
    <Layout>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Welcome to QTO Shell</h1>
        <p>Select an application from the sidebar to get started.</p>
        <div style={{ marginTop: '2rem' }}>
          <Button>Get Started</Button>
        </div>
      </div>
    </Layout>
  );
}

export default App;