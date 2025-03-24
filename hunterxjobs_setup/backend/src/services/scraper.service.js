// 1. Create a LinkedIn Scraper Service (backend/src/services/scraper.service.js)
const puppeteer = require('puppeteer');

class LinkedInScraper {
  async scrapeProfile(profileUrl) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      
      // Navigate to LinkedIn profile
      await page.goto(profileUrl, { waitUntil: 'networkidle2' });
      
      // Extract profile data
      const profileData = await page.evaluate(() => {
        return {
          name: document.querySelector('.pv-top-card--list .text-heading-xlarge')?.innerText || '',
          headline: document.querySelector('.pv-top-card--list .text-body-medium')?.innerText || '',
          about: document.querySelector('.pv-about-section .pv-shared-text-with-see-more')?.innerText || '',
          experience: Array.from(document.querySelectorAll('.experience-section .pv-entity__summary-info')).map(exp => ({
            title: exp.querySelector('h3')?.innerText || '',
            company: exp.querySelector('.pv-entity__secondary-title')?.innerText || '',
            duration: exp.querySelector('.pv-entity__date-range span:not(:first-child)')?.innerText || '',
            description: exp.querySelector('.pv-entity__description')?.innerText || ''
          })),
          education: Array.from(document.querySelectorAll('.education-section .pv-entity__summary-info')).map(edu => ({
            school: edu.querySelector('h3')?.innerText || '',
            degree: edu.querySelector('.pv-entity__secondary-title')?.innerText || '',
            timeframe: edu.querySelector('.pv-entity__date-range span:not(:first-child)')?.innerText || ''
          })),
          skills: Array.from(document.querySelectorAll('.pv-skill-category-entity__name-text')).map(skill => 
            skill.innerText
          )
        };
      });
      
      return profileData;
    } finally {
      await browser.close();
    }
  }
}

module.exports = new LinkedInScraper();
