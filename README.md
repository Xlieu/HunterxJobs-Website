# HunterxJobs-Website

AI-Powered LinkedIn Profile Optimization for Job Seekers

## About This Project

HunterxJobs is a comprehensive platform designed to help job seekers optimize their LinkedIn profiles using advanced AI technology. Our system analyzes your profile, compares it against industry benchmarks, and provides actionable recommendations to increase your visibility to recruiters.

## GitHub Pages Deployment

This project is configured to be deployed on GitHub Pages, allowing you to view the user interface and interact with mock data.

### Automatic Deployment

The repository is configured with GitHub Actions for automatic deployment:

1. Any push to the main/master branch will trigger a deployment
2. The deployment workflow builds the Next.js application and publishes it to GitHub Pages
3. The site will be available at https://[your-username].github.io/HunterxJobs-Website/

### Manual Deployment

To manually deploy the frontend to GitHub Pages:

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd hunterxjobs_setup/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the setup script:
   ```bash
   node setup-gh-pages.js
   ```
5. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Development

For local development with full functionality:

1. Set up the backend:
   ```bash
   cd hunterxjobs_setup/backend
   npm install
   npm run dev
   ```

2. Set up the frontend:
   ```bash
   cd hunterxjobs_setup/frontend
   npm install
   npm run dev
   ```

3. Access the application at `http://localhost:3000`

## Note About GitHub Pages Version

The GitHub Pages version uses mock data since it's a static site without backend connectivity. For full functionality, the application needs to be run locally or deployed with the backend on a proper hosting platform.

## Documentation

For detailed documentation, please see the following:

- [Setup Guide](hunterxjobs_setup/SETUP_GUIDE.md)
- [Project Documentation](hunterxjobs_setup/DOCUMENTATION.md)
- [Troubleshooting](hunterxjobs_setup/TROUBLESHOOTING.md)
