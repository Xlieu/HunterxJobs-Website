import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../src/pages/dashboard';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/dashboard',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
    };
  },
}));

// Mock profile service
jest.mock('../src/services/profile.service', () => ({
  getProfileHealthScore: jest.fn().mockResolvedValue({ 
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
  }),
  getIndustryBenchmark: jest.fn().mockResolvedValue({
    industryAverage: 65,
    userScore: 78,
    topPerformers: 92
  }),
  getOpportunityRadar: jest.fn().mockResolvedValue([
    { role: 'Marketing Director', match: 87, company: 'Tech Corp' },
    { role: 'Digital Marketing Lead', match: 82, company: 'Innovate Inc' }
  ])
}));

// Mock auth context
jest.mock('../src/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { name: 'Test User', email: 'test@example.com' },
    isAuthenticated: true
  })
}));

describe('Dashboard Page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  });

  test('renders dashboard header with user name', () => {
    expect(screen.getByText(/Welcome, Test User/i)).toBeInTheDocument();
  });

  test('renders dashboard tabs', () => {
    expect(screen.getByRole('tab', { name: /Profile Analysis/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Optimization/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Content War Room/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Performance Metrics/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Settings/i })).toBeInTheDocument();
  });

  test('displays profile health score', async () => {
    await waitFor(() => {
      expect(screen.getByText(/78/i)).toBeInTheDocument();
      expect(screen.getByText(/\+13%/i)).toBeInTheDocument();
    });
  });

  test('changes tab when clicked', async () => {
    const optimizationTab = screen.getByRole('tab', { name: /Optimization/i });
    
    fireEvent.click(optimizationTab);
    
    await waitFor(() => {
      expect(screen.getByText(/Optimization Suggestions/i)).toBeInTheDocument();
    });
  });

  test('displays industry benchmark comparison', async () => {
    await waitFor(() => {
      expect(screen.getByText(/Industry Average: 65/i)).toBeInTheDocument();
      expect(screen.getByText(/Top Performers: 92/i)).toBeInTheDocument();
    });
  });

  test('displays opportunity radar results', async () => {
    await waitFor(() => {
      expect(screen.getByText(/Marketing Director/i)).toBeInTheDocument();
      expect(screen.getByText(/87% Match/i)).toBeInTheDocument();
      expect(screen.getByText(/Digital Marketing Lead/i)).toBeInTheDocument();
    });
  });
});
