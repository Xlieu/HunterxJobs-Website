const request = require('supertest');
const app = require('../src/server');

describe('Optimization API Endpoints', () => {
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

  describe('GET /api/optimization/suggestions', () => {
    it('should return optimization suggestions for profile', async () => {
      const res = await request(app)
        .get('/api/optimization/suggestions')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('bio');
      expect(res.body).toHaveProperty('experience');
      expect(res.body).toHaveProperty('skills');
    });
  });

  describe('GET /api/optimization/title', () => {
    it('should return title optimization suggestions', async () => {
      const res = await request(app)
        .get('/api/optimization/title')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('currentTitle');
      expect(res.body).toHaveProperty('suggestions');
      expect(res.body).toHaveProperty('estimatedImpact');
    });
  });

  describe('GET /api/optimization/bio', () => {
    it('should return bio optimization suggestions', async () => {
      const res = await request(app)
        .get('/api/optimization/bio')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('currentBio');
      expect(res.body).toHaveProperty('suggestions');
      expect(res.body).toHaveProperty('estimatedImpact');
    });
  });

  describe('POST /api/optimization/apply', () => {
    it('should apply optimization suggestion', async () => {
      const res = await request(app)
        .post('/api/optimization/apply')
        .set('Authorization', `Bearer ${token}`)
        .send({
          section: 'title',
          suggestion: 'Strategic Marketing Leader | Digital Campaign Specialist'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('section', 'title');
    });

    it('should return validation errors if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/optimization/apply')
        .set('Authorization', `Bearer ${token}`)
        .send({
          section: 'title'
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('errors');
    });
  });

  describe('POST /api/optimization/publish', () => {
    it('should publish all optimizations to LinkedIn', async () => {
      const res = await request(app)
        .post('/api/optimization/publish')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('publishedSections');
    });
  });
});
