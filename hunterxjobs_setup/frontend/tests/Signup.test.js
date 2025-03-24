import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../src/pages/signup';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/signup',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
    };
  },
}));

// Mock auth service
jest.mock('../src/services/auth.service', () => ({
  register: jest.fn().mockResolvedValue({ token: 'fake-token', user: { name: 'New User' } }),
}));

describe('Signup Page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
  });

  test('renders signup form with name, email and password fields', () => {
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
    
    fireEvent.click(signUpButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  test('shows error when passwords do not match', async () => {
    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
    
    fireEvent.change(nameInput, { target: { value: 'New User' } });
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    fireEvent.click(signUpButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Passwords must match/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid data and redirects to dashboard', async () => {
    const authService = require('../src/services/auth.service');
    const router = require('next/router').useRouter();
    
    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
    
    fireEvent.change(nameInput, { target: { value: 'New User' } });
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(signUpButton);
    
    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith('New User', 'new@example.com', 'password123');
      expect(router.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('renders sign in link', () => {
    const signInLink = screen.getByText(/Already have an account\? Sign in/i);
    expect(signInLink).toBeInTheDocument();
    expect(signInLink.closest('a')).toHaveAttribute('href', '/login');
  });
});
