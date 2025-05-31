const request = require('supertest');
const app = require('../src/server');

describe('Content API Endpoints', () => {
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

  describe('POST /api/content/generate', () => {
    it('should generate LinkedIn content', async () => {
      const res = await request(app)
        .post('/api/content/generate')
        .set('Authorization', `Bearer ${token}`)
        .send({
          contentType: 'post',
          persona: 'thought_leader',
          topic: 'digital marketing trends'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('content');
      expect(res.body).toHaveProperty('vppiScore');
      expect(res.body).toHaveProperty('recommendedHashtags');
    });

    it('should return validation errors if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/content/generate')
        .set('Authorization', `Bearer ${token}`)
        .send({
          contentType: 'post',
          topic: 'digital marketing trends'
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/content/personas', () => {
    it('should return available writing personas', async () => {
      const res = await request(app)
        .get('/api/content/personas')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/content/templates', () => {
    it('should return content templates', async () => {
      const res = await request(app)
        .get('/api/content/templates')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/content/analyze', () => {
    it('should analyze content for virality', async () => {
      const res = await request(app)
        .post('/api/content/analyze')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'The digital marketing landscape isn\'t just evolving—it\'s experiencing a complete metamorphosis...'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('vppiScore');
      expect(res.body).toHaveProperty('breakdown');
      expect(res.body).toHaveProperty('improvementSuggestions');
    });
  });

  describe('GET /api/content/hashtags', () => {
    it('should return trending hashtag suggestions', async () => {
      const res = await request(app)
        .get('/api/content/hashtags')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('trending');
      expect(res.body).toHaveProperty('industry');
      expect(res.body).toHaveProperty('personalized');
    });
  });

  describe('POST /api/content/schedule', () => {
    it('should schedule content for posting', async () => {
      const res = await request(app)
        .post('/api/content/schedule')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'The digital marketing landscape isn\'t just evolving—it\'s experiencing a complete metamorphosis...',
          postDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          hashtags: ['#DigitalMarketing', '#MarketingStrategy']
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('scheduledId');
      expect(res.body).toHaveProperty('scheduledFor');
    });
  });

  describe('GET /api/content/scheduled', () => {
    it('should return scheduled content', async () => {
      const res = await request(app)
        .get('/api/content/scheduled')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
