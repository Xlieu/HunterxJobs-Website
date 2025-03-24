const request = require('supertest');
const app = require('../src/server');

describe('LinkedIn API Endpoints', () => {
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

  describe('POST /api/linkedin/connect', () => {
    it('should initiate LinkedIn connection', async () => {
      const res = await request(app)
        .post('/api/linkedin/connect')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('redirectUrl');
    });
  });

  describe('GET /api/linkedin/status', () => {
    it('should return LinkedIn connection status', async () => {
      const res = await request(app)
        .get('/api/linkedin/status')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('connected');
      expect(res.body).toHaveProperty('lastSynced');
      expect(res.body).toHaveProperty('username');
      expect(res.body).toHaveProperty('permissions');
    });
  });

  describe('GET /api/linkedin/profile', () => {
    it('should return LinkedIn profile data', async () => {
      const res = await request(app)
        .get('/api/linkedin/profile')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('firstName');
      expect(res.body).toHaveProperty('lastName');
      expect(res.body).toHaveProperty('headline');
      expect(res.body).toHaveProperty('positions');
      expect(res.body).toHaveProperty('skills');
    });
  });

  describe('POST /api/linkedin/post', () => {
    it('should post content to LinkedIn', async () => {
      const res = await request(app)
        .post('/api/linkedin/post')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'The digital marketing landscape isn\'t just evolving—it\'s experiencing a complete metamorphosis...',
          hashtags: ['#DigitalMarketing', '#MarketingStrategy']
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('postId');
      expect(res.body).toHaveProperty('postedAt');
    });

    it('should return validation errors if content is missing', async () => {
      const res = await request(app)
        .post('/api/linkedin/post')
        .set('Authorization', `Bearer ${token}`)
        .send({
          hashtags: ['#DigitalMarketing', '#MarketingStrategy']
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/linkedin/posts', () => {
    it('should return LinkedIn posts', async () => {
      const res = await request(app)
        .get('/api/linkedin/posts')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      if (res.body.length > 0) {
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('content');
        expect(res.body[0]).toHaveProperty('publishedAt');
      }
    });
  });

  describe('GET /api/linkedin/connections', () => {
    it('should return LinkedIn connections', async () => {
      const res = await request(app)
        .get('/api/linkedin/connections')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('total');
      expect(res.body).toHaveProperty('connections');
      expect(res.body).toHaveProperty('pagination');
    });
  });

  describe('POST /api/linkedin/disconnect', () => {
    it('should disconnect LinkedIn account', async () => {
      const res = await request(app)
        .post('/api/linkedin/disconnect')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /api/linkedin/rate-limits', () => {
    it('should return LinkedIn API rate limit status', async () => {
      const res = await request(app)
        .get('/api/linkedin/rate-limits')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('dailyLimit');
      expect(res.body).toHaveProperty('remaining');
      expect(res.body).toHaveProperty('resetTime');
      expect(res.body).toHaveProperty('percentUsed');
    });
  });
});
