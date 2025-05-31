// 2. Create Profile Analysis Service (backend/src/services/profile-analyzer.service.js)
const topProfiles = require('../data/top_linkedin_profiles.json');

class ProfileAnalyzer {
  constructor() {
    this.benchmarkProfiles = topProfiles;
    this.atsKeywords = this.extractAtsKeywords();
  }
  
  extractAtsKeywords() {
    // Extract common keywords from top profiles for ATS matching
    const keywords = {};
    
    this.benchmarkProfiles.forEach(profile => {
      // Process skills
      profile.skills.forEach(skill => {
        keywords[skill] = (keywords[skill] || 0) + 1;
      });
      
      // Process experience keywords
      profile.experience.forEach(exp => {
        const words = exp.description.toLowerCase().split(/\s+/);
        words.forEach(word => {
          if (word.length > 3 && !this.isStopWord(word)) {
            keywords[word] = (keywords[word] || 0) + 1;
          }
        });
      });
    });
    
    // Return top 100 keywords sorted by frequency
    return Object.entries(keywords)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100)
      .map(entry => entry[0]);
  }
  
  isStopWord(word) {
    const stopWords = ['and', 'the', 'for', 'with', 'this', 'that', 'have', 'from'];
    return stopWords.includes(word);
  }
  
  analyzeProfile(profileData) {
    const scores = {
      headline: this.scoreHeadline(profileData.headline),
      about: this.scoreAbout(profileData.about),
      experience: this.scoreExperience(profileData.experience),
      education: this.scoreEducation(profileData.education),
      skills: this.scoreSkills(profileData.skills),
      atsCompatibility: this.scoreAtsCompatibility(profileData)
    };
    
    // Calculate overall score (weighted average)
    const overallScore = Math.round(
      (scores.headline * 0.15) +
      (scores.about * 0.15) +
      (scores.experience * 0.30) +
      (scores.education * 0.10) +
      (scores.skills * 0.20) +
      (scores.atsCompatibility * 0.10)
    );
    
    return {
      scores,
      overallScore,
      recommendations: this.generateRecommendations(scores, profileData)
    };
  }
  
  scoreHeadline(headline) {
    if (!headline) return 0;
    
    let score = 0;
    
    // Length check (optimal: 50-120 characters)
    const length = headline.length;
    if (length >= 50 && length <= 120) {
      score += 40;
    } else if (length >= 30 && length < 50) {
      score += 30;
    } else if (length > 120) {
      score += 20;
    } else {
      score += 10;
    }
    
    // Keyword presence
    const keywordPatterns = [
      /specialist|expert|professional|certified|experienced/i,
      /lead|manager|director|head/i,
      /results|success|achievement|accomplished/i
    ];
    
    keywordPatterns.forEach(pattern => {
      if (pattern.test(headline)) {
        score += 20;
      }
    });
    
    return Math.min(100, score);
  }
  
  scoreAbout(about) {
    if (!about) return 0;
    
    let score = 0;
    
    // Length check (optimal: 200-2000 characters)
    const length = about.length;
    if (length >= 200 && length <= 2000) {
      score += 40;
    } else if (length >= 100 && length < 200) {
      score += 20;
    } else if (length > 2000) {
      score += 30;
    } else {
      score += 10;
    }
    
    // Content quality checks
    const patterns = [
      /experience|expertise|skill/i, // Mentions experience
      /achieve|accomplish|success|result/i, // Achievement-oriented
      /passion|dedicated|committed/i, // Shows passion
      /team|collaborate|work with/i, // Team player
      /contact|email|reach/i // Call to action
    ];
    
    patterns.forEach(pattern => {
      if (pattern.test(about)) {
        score += 12;
      }
    });
    
    return Math.min(100, score);
  }
  
  scoreExperience(experience) {
    if (!experience || experience.length === 0) return 0;
    
    let score = 0;
    
    // Number of experiences
    const count = experience.length;
    if (count >= 3) {
      score += 20;
    } else if (count === 2) {
      score += 15;
    } else {
      score += 10;
    }
    
    // Quality of each experience
    let qualityScore = 0;
    experience.forEach(exp => {
      let entryScore = 0;
      
      // Has title
      if (exp.title && exp.title.length > 0) entryScore += 5;
      
      // Has company
      if (exp.company && exp.company.length > 0) entryScore += 5;
      
      // Has duration
      if (exp.duration && exp.duration.length > 0) entryScore += 5;
      
      // Description quality
      if (exp.description) {
        const descLength = exp.description.length;
        
        // Length check
        if (descLength > 300) {
          entryScore += 10;
        } else if (descLength > 100) {
          entryScore += 5;
        }
        
        // Achievement-oriented language
        if (/increase|improve|grow|achieve|lead|manage|develop|create|launch|implement/i.test(exp.description)) {
          entryScore += 10;
        }
        
        // Quantifiable results
        if (/\d+%|\$\d+|\d+ percent|million|billion/i.test(exp.description)) {
          entryScore += 15;
        }
      }
      
      qualityScore += Math.min(50, entryScore);
    });
    
    // Average the quality score across all experiences
    score += (qualityScore / Math.max(1, count)) * 1.6;
    
    return Math.min(100, score);
  }
  
  scoreEducation(education) {
    if (!education || education.length === 0) return 0;
    
    let score = 0;
    
    // Number of education entries
    const count = education.length;
    if (count >= 2) {
      score += 30;
    } else {
      score += 20;
    }
    
    // Quality of each education entry
    let qualityScore = 0;
    education.forEach(edu => {
      let entryScore = 0;
      
      // Has school
      if (edu.school && edu.school.length > 0) entryScore += 10;
      
      // Has degree
      if (edu.degree && edu.degree.length > 0) entryScore += 15;
      
      // Has timeframe
      if (edu.timeframe && edu.timeframe.length > 0) entryScore += 5;
      
      qualityScore += entryScore;
    });
    
    // Average the quality score across all education entries
    score += (qualityScore / Math.max(1, count)) * 2.3;
    
    return Math.min(100, score);
  }
  
  scoreSkills(skills) {
    if (!skills || skills.length === 0) return 0;
    
    let score = 0;
    
    // Number of skills
    const count = skills.length;
    if (count >= 15) {
      score += 40;
    } else if (count >= 10) {
      score += 30;
    } else if (count >= 5) {
      score += 20;
    } else {
      score += 10;
    }
    
    // Skill relevance (compare with benchmark profiles)
    const benchmarkSkills = new Set();
    this.benchmarkProfiles.forEach(profile => {
      profile.skills.forEach(skill => benchmarkSkills.add(skill.toLowerCase()));
    });
    
    let matchCount = 0;
    skills.forEach(skill => {
      if (benchmarkSkills.has(skill.toLowerCase())) {
        matchCount++;
      }
    });
    
    const matchRate = matchCount / Math.max(1, count);
    score += matchRate * 60;
    
    return Math.min(100, score);
  }
  
  scoreAtsCompatibility(profileData) {
    let score = 0;
    const allText = [
      profileData.headline,
      profileData.about,
      ...profileData.experience.map(e => `${e.title} ${e.company} ${e.description}`),
      ...profileData.skills
    ].join(' ').toLowerCase();
    
    // Check for ATS keywords
    let keywordMatches = 0;
    this.atsKeywords.forEach(keyword => {
      if (allText.includes(keyword.toLowerCase())) {
        keywordMatches++;
      }
    });
    
    const keywordMatchRate = keywordMatches / this.atsKeywords.length;
    score += keywordMatchRate * 70;
    
    // Check for formatting issues that might affect ATS
    if (!/[^\w\s]/.test(profileData.name)) score += 10; // Clean name format
    if (profileData.experience.every(e => e.title && e.company)) score += 10; // Complete job entries
    if (profileData.skills.length >= 5) score += 10; // Sufficient skills
    
    return Math.min(100, score);
  }
  
  generateRecommendations(scores, profileData) {
    const recommendations = [];
    
    // Headline recommendations
    if (scores.headline < 70) {
      if (!profileData.headline || profileData.headline.length < 50) {
        recommendations.push({
          section: 'headline',
          issue: 'Your headline is too short or missing',
          recommendation: 'Create a compelling headline that includes your current role, expertise, and value proposition (50-120 characters)'
        });
      } else if (profileData.headline.length > 120) {
        recommendations.push({
          section: 'headline',
          issue: 'Your headline is too long',
          recommendation: 'Shorten your headline to 120 characters or less while keeping key information'
        });
      }
      
      if (!/specialist|expert|professional|certified|experienced/i.test(profileData.headline)) {
        recommendations.push({
          section: 'headline',
          issue: 'Missing expertise indicators',
          recommendation: 'Include terms like "Specialist," "Expert," or "Certified" to establish credibility'
        });
      }
    }
    
    // About recommendations
    if (scores.about < 70) {
      if (!profileData.about || profileData.about.length < 200) {
        recommendations.push({
          section: 'about',
          issue: 'Your about section is too short or missing',
          recommendation: 'Write a compelling about section (200-2000 characters) that tells your professional story'
        });
      }
      
      if (profileData.about && !/achieve|accomplish|success|result/i.test(profileData.about)) {
        recommendations.push({
          section: 'about',
          issue: 'Missing achievement focus',
          recommendation: 'Include specific achievements and results to demonstrate your impact'
        });
      }
    }
    
    // Experience recommendations
    if (scores.experience < 70) {
      if (!profileData.experience || profileData.experience.length < 2) {
        recommendations.push({
          section: 'experience',
          issue: 'Not enough work experience entries',
          recommendation: 'Add more relevant work experiences to showcase your career progression'
        });
      }
      
      const weakDescriptions = profileData.experience.filter(exp => 
        !exp.description || exp.description.length < 100 || 
        !/increase|improve|grow|achieve|lead|manage|develop|create|launch|implement/i.test(exp.description)
      );
      
      if (weakDescriptions.length > 0) {
        recommendations.push({
          section: 'experience',
          issue: 'Weak job descriptions',
          recommendation: 'Enhance job descriptions with accomplishments, metrics, and action verbs'
        });
      }
      
      const missingMetrics = profileData.experience.filter(exp => 
        !exp.description || !/\d+%|\$\d+|\d+ percent|million|billion/i.test(exp.description)
      );
      
      if (missingMetrics.length > 0) {
        recommendations.push({
          section: 'experience',
          issue: 'Missing quantifiable results',
          recommendation: 'Add specific metrics and numbers to quantify your achievements (e.g., "Increased sales by 25%")'
        });
      }
    }
    
    // Skills recommendations
    if (scores.skills < 70) {
      if (!profileData.skills || profileData.skills.length < 10) {
        recommendations.push({
          section: 'skills',
          issue: 'Not enough skills listed',
          recommendation: 'Add at least 15 relevant skills to your profile'
        });
      }
      
      // Recommend industry-relevant skills
      const benchmarkSkills = new Set();
      this.benchmarkProfiles.forEach(profile => {
        profile.skills.forEach(skill => benchmarkSkills.add(skill.toLowerCase()));
      });
      
      const userSkillsLower = new Set(profileData.skills.map(s => s.toLowerCase()));
      const missingKeySkills = Array.from(benchmarkSkills)
        .filter(skill => !userSkillsLower.has(skill))
        .slice(0, 5);
      
      if (missingKeySkills.length > 0) {
        recommendations.push({
          section: 'skills',
          issue: 'Missing key industry skills',
          recommendation: `Consider adding these relevant skills: ${missingKeySkills.join(', ')}`
        });
      }
    }
    
    // ATS recommendations
    if (scores.atsCompatibility < 70) {
      recommendations.push({
        section: 'ats',
        issue: 'Low ATS compatibility',
        recommendation: 'Improve your profile\'s visibility to Applicant Tracking Systems by incorporating more industry-specific keywords'
      });
      
      // Recommend specific ATS keywords
      const allText = [
        profileData.headline,
        profileData.about,
        ...profileData.experience.map(e => `${e.title} ${e.company} ${e.description}`),
        ...profileData.skills
      ].join(' ').toLowerCase();
      
      const missingAtsKeywords = this.atsKeywords
        .filter(keyword => !allText.includes(keyword.toLowerCase()))
        .slice(0, 5);
      
      if (missingAtsKeywords.length > 0) {
        recommendations.push({
          section: 'ats',
          issue: 'Missing important ATS keywords',
          recommendation: `Consider incorporating these keywords: ${missingAtsKeywords.join(', ')}`
        });
      }
    }
    
    return recommendations;
  }
}

module.exports = new ProfileAnalyzer();
