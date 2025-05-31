const request = require('supertest');
const app = require('../src/server');

describe('Metrics API Endpoints', () => {
  let token;

  // Before all tests, get authentication token
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    token = res.body.token;
  });

  describe('GET /api/metrics/dashboard', () => {
    it('should return metrics dashboard data', async () => {
      const res = await request(app)
        .get('/api/metrics/dashboard')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('profileVisibilityIndex');
      expect(res.body).toHaveProperty('opportunityFlowRate');
      expect(res.body).toHaveProperty('contentAmplificationScore');
      expect(res.body).toHaveProperty('careerMomentumIndicator');
    });
  });

  describe('GET /api/metrics/profile-visibility', () => {
    it('should return Profile Visibility Index (PVI)', async () => {
      const res = await request(app)
        .get('/api/metrics/profile-visibility')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('currentScore');
      expect(res.body).toHaveProperty('previousScore');
      expect(res.body).toHaveProperty('change');
      expect(res.body).toHaveProperty('history');
      expect(res.body).toHaveProperty('factors');
    });
  });

  describe('GET /api/metrics/opportunity-flow', () => {
    it('should return Opportunity Flow Rate (OFR)', async () => {
      const res = await request(app)
        .get('/api/metrics/opportunity-flow')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('currentScore');
      expect(res.body).toHaveProperty('previousScore');
      expect(res.body).toHaveProperty('change');
      expect(res.body).toHaveProperty('history');
      expect(res.body).toHaveProperty('breakdown');
    });
  });

  describe('GET /api/metrics/content-amplification', () => {
    it('should return Content Amplification Score (CAS)', async () => {
      const res = await request(app)
        .get('/api/metrics/content-amplification')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('currentScore');
      expect(res.body).toHaveProperty('previousScore');
      expect(res.body).toHaveProperty('change');
      expect(res.body).toHaveProperty('history');
      expect(res.body).toHaveProperty('topPerformingContent');
    });
  });

  describe('GET /api/metrics/career-momentum', () => {
    it('should return Career Momentum Indicator (CMI)', async () => {
      const res = await request(app)
        .get('/api/metrics/career-momentum')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('currentScore');
      expect(res.body).toHaveProperty('previousScore');
      expect(res.body).toHaveProperty('change');
      expect(res.body).toHaveProperty('history');
      expect(res.body).toHaveProperty('growthFactors');
    });
  });

  describe('GET /api/metrics/profile-views', () => {
    it('should return profile views history', async () => {
      const res = await request(app)
        .get('/api/metrics/profile-views')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('total');
      expect(res.body).toHaveProperty('change');
      expect(res.body).toHaveProperty('dailyData');
      expect(res.body).toHaveProperty('viewerBreakdown');
    });
  });

  describe('GET /api/metrics/export', () => {
    it('should export metrics data', async () => {
      const res = await request(app)
        .get('/api/metrics/export')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('exportedAt');
    });
  });
});
