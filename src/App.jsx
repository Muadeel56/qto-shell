import React from 'react';
import { Header } from './components';
const Button = React.lazy(() => import('qto_theme/Button'));

function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: '2rem' }}>
        <Button>Button</Button>
        <h1>Welcome to QTO Design System</h1>
      </main>
    </div>
  );
}

export default App;