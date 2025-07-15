import React from 'react';
const Button = React.lazy(() => import('qto_theme/Button'))
const Card = React.lazy(() => import('qto_theme/Card'))

function App() {
  return (
    <div className='min-h-screen p-8 bg-[var(--background)] text-[var(--text)] space-y-4'>
      <h1 className='text-3xl font-bold'>QTO Shell</h1>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Card>
          <h2 className='text-xl mb-4'>Card from qto-theme</h2>
          <Button>Remote Button</Button>
        </Card>
        </React.Suspense>
  </div>
  )
}

export default App