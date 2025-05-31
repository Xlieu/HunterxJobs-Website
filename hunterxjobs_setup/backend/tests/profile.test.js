const request = require('supertest');
const app = require('../src/server');

describe('Profile API Endpoints', () => {
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

  describe('GET /api/profile/analyze', () => {
    it('should analyze LinkedIn profile', async () => {
      const res = await request(app)
        .get('/api/profile/analyze')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('profileStrength');
      expect(res.body).toHaveProperty('recommendations');
    });

    it('should return error if not authenticated', async () => {
      const res = await request(app)
        .get('/api/profile/analyze');
      
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('GET /api/profile/health-score', () => {
    it('should return profile health score', async () => {
      const res = await request(app)
        .get('/api/profile/health-score')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('score');
      expect(res.body).toHaveProperty('breakdown');
    });
  });

  describe('GET /api/profile/benchmark', () => {
    it('should return industry benchmark comparison', async () => {
      const res = await request(app)
        .get('/api/profile/benchmark')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('industryAverage');
      expect(res.body).toHaveProperty('userScore');
      expect(res.body).toHaveProperty('topPerformers');
    });
  });

  describe('POST /api/profile/sync', () => {
    it('should sync LinkedIn profile data', async () => {
      const res = await request(app)
        .post('/api/profile/sync')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('lastSynced');
    });
  });

  describe('POST /api/profile/update', () => {
    it('should update LinkedIn profile section', async () => {
      const res = await request(app)
        .post('/api/profile/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          section: 'title',
          content: 'Strategic Marketing Leader | Digital Campaign Specialist'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('section', 'title');
    });

    it('should return validation errors if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/profile/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          section: 'title'
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('errors');
    });
  });
});
