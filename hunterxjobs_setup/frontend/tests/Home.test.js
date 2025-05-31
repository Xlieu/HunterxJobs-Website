import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../src/pages/index';

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

describe('Home Page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  test('renders hero section with title and subtitle', () => {
    expect(screen.getByText(/AI-Powered Career Catalyst/i)).toBeInTheDocument();
    expect(screen.getByText(/Transform Your LinkedIn Presence/i)).toBeInTheDocument();
  });

  test('renders call-to-action buttons', () => {
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Learn More/i })).toBeInTheDocument();
  });

  test('renders features section', () => {
    expect(screen.getByText(/LinkedIn Integration Engine/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Optimization Matrix/i)).toBeInTheDocument();
    expect(screen.getByText(/Dynamic Optimization Modules/i)).toBeInTheDocument();
    expect(screen.getByText(/Content War Room/i)).toBeInTheDocument();
  });

  test('clicking Get Started button navigates to signup page', async () => {
    const router = require('next/router').useRouter();
    const getStartedButton = screen.getByRole('button', { name: /Get Started/i });
    
    fireEvent.click(getStartedButton);
    
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/signup');
    });
  });
});
