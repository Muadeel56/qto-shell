import React, { useState } from 'react';

// Import components from qto-theme module federation
const Button = React.lazy(() => import('qto_theme/Button'));
const Input = React.lazy(() => import('qto_theme/Input'));
const Card = React.lazy(() => import('qto_theme/Card'));
const Badge = React.lazy(() => import('qto_theme/Badge'));
const Avatar = React.lazy(() => import('qto_theme/Avatar'));
const Modal = React.lazy(() => import('qto_theme/Modal'));

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted from QTO Shell!');
    console.log('Form data:', formData);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 py-8">
        <React.Suspense fallback={<div className="text-center">Loading components...</div>}>
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
              QTO Shell Application
            </h1>
            <p className="text-lg text-gray-600">
              Using QTO Theme Components via Module Federation
            </p>
          </div>

          {/* Button Showcase */}
          <Card className="mb-6">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Button Components</h2>
              <div className="flex flex-wrap gap-4 mb-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger Button</Button>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </Card>

          {/* Form Components */}
          <Card className="mb-6">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Form Components</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Message"
                  name="message"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleInputChange}
                  helperText="Optional feedback or message"
                />
                <div className="flex gap-4">
                  <Button type="submit" variant="primary">
                    Submit Form
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsModalOpen(true)}
                  >
                    Open Modal
                  </Button>
                </div>
              </form>
            </div>
          </Card>

          {/* UI Components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Avatars</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <Avatar name="John Doe" size="sm" />
                  <Avatar name="Jane Smith" size="md" />
                  <Avatar name="Bob Johnson" size="lg" />
                  <Avatar name="Alice Brown" size="xl" variant="square" />
                  <Avatar name="Charlie Wilson" size="2xl" variant="rounded" />
                </div>
              </div>
            </Card>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="outlined">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Outlined Style</h3>
                <p className="text-gray-600 mb-4">
                  This card uses the outlined variant with a visible border.
                </p>
                <Button variant="primary" size="sm" fullWidth>
                  Learn More
                </Button>
              </div>
            </Card>

            <Card variant="filled">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Filled Style</h3>
                <p className="text-gray-600 mb-4">
                  This card uses the filled variant with a background color.
                </p>
                <Button variant="secondary" size="sm" fullWidth>
                  Get Started
                </Button>
              </div>
            </Card>

            <Card variant="elevated" shadow="lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Elevated Style</h3>
                <p className="text-gray-600 mb-4">
                  This card uses the elevated variant with a shadow effect.
                </p>
                <Button variant="outline" size="sm" fullWidth>
                  Contact Us
                </Button>
              </div>
            </Card>
          </div>

          {/* Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="QTO Shell Modal"
            size="md"
          >
            <div className="py-4">
              <p className="mb-4">
                This modal is being rendered from the QTO Theme components 
                inside the QTO Shell application using Module Federation.
              </p>
              <div className="space-y-2">
                <p>✅ Theme consistency maintained</p>
                <p>✅ Components shared across applications</p>
                <p>✅ Responsive and accessible</p>
                <p>✅ Easy to maintain and update</p>
              </div>
            </div>
            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                Confirm
              </Button>
            </div>
          </Modal>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t">
            <p className="text-gray-600 mb-2">
              QTO Shell - Powered by QTO Theme Components
            </p>
            <div className="flex justify-center gap-2">
              <Badge variant="primary" rounded="full">Module Federation</Badge>
              <Badge variant="secondary" rounded="full">React 19</Badge>
              <Badge variant="success" rounded="full">Vite</Badge>
            </div>
          </div>

        </React.Suspense>
      </div>
    </div>
  );
}

export default App;