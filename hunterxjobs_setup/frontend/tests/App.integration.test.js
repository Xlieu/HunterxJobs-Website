import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../src/pages/_app';

// Mock API responses
const server = setupServer(
  // Auth endpoints
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(ctx.json({ token: 'fake-token', user: { name: 'Test User' } }));
  }),
  
  // Profile endpoints
  rest.get('/api/profile/health-score', (req, res, ctx) => {
    return res(ctx.json({ 
      score: 78, 
      previousScore: 65,
      change: 13,
      breakdown: {
        title: 85,
        bio: 75,
        experience: 80,
        skills: 70,
        education: 80
      }
    }));
  }),
  
  // Optimization endpoints
  rest.get('/api/optimization/suggestions', (req, res, ctx) => {
    return res(ctx.json({
      title: ['Strategic Marketing Leader', 'Digital Marketing Specialist'],
      bio: ['Results-driven marketing professional...'],
      experience: [{ position: 'Marketing Manager', suggestions: ['Led digital transformation...'] }],
      skills: ['SEO', 'Content Strategy', 'Analytics']
    }));
  }),
  
  // Content endpoints
  rest.get('/api/content/personas', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: 'Thought Leader', description: 'Authoritative industry voice' },
      { id: 2, name: 'Storyteller', description: 'Engaging narrative style' }
    ]));
  })
);

// Setup and teardown MSW server
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
    };
  },
}));

describe('App Integration Tests', () => {
  test('app renders without crashing', async () => {
    render(
      <BrowserRouter>
        <App Component={() => <div>Test Component</div>} pageProps={{}} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
  
  test('app provides authentication context', async () => {
    const TestComponent = () => {
      const { useAuth } = require('../src/contexts/AuthContext');
      const { isAuthenticated, login, logout } = useAuth();
      
      return (
        <div>
          <div data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
          <button onClick={() => login('test@example.com', 'password')}>Login</button>
          <button onClick={() => logout()}>Logout</button>
        </div>
      );
    };
    
    render(
      <BrowserRouter>
        <App Component={TestComponent} pageProps={{}} />
      </BrowserRouter>
    );
    
    const loginButton = screen.getByText('Login');
    loginButton.click();
    
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    });
    
    const logoutButton = screen.getByText('Logout');
    logoutButton.click();
    
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    });
  });
  
  test('app handles API errors gracefully', async () => {
    // Override the profile endpoint to return an error
    server.use(
      rest.get('/api/profile/health-score', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Server error' }));
      })
    );
    
    const TestComponent = () => {
      const [error, setError] = React.useState(null);
      const [loading, setLoading] = React.useState(false);
      
      React.useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await fetch('/api/profile/health-score');
            if (!response.ok) {
              throw new Error('Failed to fetch');
            }
            const data = await response.json();
            setLoading(false);
          } catch (err) {
            setError('An error occurred');
            setLoading(false);
          }
        };
        
        fetchData();
      }, []);
      
      if (loading) return <div>Loading...</div>;
      if (error) return <div data-testid="error-message">{error}</div>;
      return <div>Data loaded</div>;
    };
    
    render(
      <BrowserRouter>
        <App Component={TestComponent} pageProps={{}} />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('An error occurred');
    });
  });
});
