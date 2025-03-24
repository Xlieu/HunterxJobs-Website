import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../src/pages/login';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/login',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
    };
  },
}));

// Mock auth service
jest.mock('../src/services/auth.service', () => ({
  login: jest.fn().mockResolvedValue({ token: 'fake-token', user: { name: 'Test User' } }),
}));

describe('Login Page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  test('renders login form with email and password fields', () => {
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    const signInButton = screen.getByRole('button', { name: /Sign In/i });
    
    fireEvent.click(signInButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid data and redirects to dashboard', async () => {
    const authService = require('../src/services/auth.service');
    const router = require('next/router').useRouter();
    
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);
    
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(router.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('renders sign up link', () => {
    const signUpLink = screen.getByText(/Don't have an account\? Sign up/i);
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink.closest('a')).toHaveAttribute('href', '/signup');
  });
});
