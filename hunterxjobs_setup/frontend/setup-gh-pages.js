/**
 * Setup script for GitHub Pages deployment
 * Run with: node setup-gh-pages.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up GitHub Pages deployment...');

// Create .nojekyll files
const createNojekyll = (dir) => {
  const filepath = path.join(dir, '.nojekyll');
  try {
    fs.writeFileSync(filepath, '');
    console.log(`✅ Created ${filepath}`);
  } catch (err) {
    console.error(`❌ Failed to create ${filepath}: ${err.message}`);
  }
};

// Create .nojekyll in public directory to prevent Jekyll processing
const publicDir = path.join(__dirname, 'public');
createNojekyll(publicDir);

// Install gh-pages package if not already installed
try {
  console.log('📦 Installing gh-pages package...');
  execSync('npm install --save-dev gh-pages', { stdio: 'inherit' });
  console.log('✅ gh-pages installed successfully');
} catch (err) {
  console.error('❌ Failed to install gh-pages:', err.message);
}

// Add a simple script to check the environment
console.log('🧪 Creating environment check script...');
const envScript = `
// This file helps check the environment variables
export const ENV_INFO = {
  NEXT_PUBLIC_BASE_PATH: '${process.env.NEXT_PUBLIC_BASE_PATH || '/HunterxJobs-Website'}',
  IS_GITHUB_PAGES: true,
  BUILD_TIME: '${new Date().toISOString()}'
};
`;

const envScriptPath = path.join(__dirname, 'src', 'env-info.js');
try {
  fs.writeFileSync(envScriptPath, envScript);
  console.log(`✅ Created ${envScriptPath}`);
} catch (err) {
  console.error(`❌ Failed to create ${envScriptPath}: ${err.message}`);
}

console.log('\n🎉 Setup complete!\n');
console.log('To deploy to GitHub Pages:');
console.log('1. Run: npm run build');
console.log('2. Run: npm run deploy');
console.log('\nMake sure you have configured your GitHub repository settings for Pages:');
console.log('- Go to Settings > Pages');
console.log('- Set source to "GitHub Actions"\n'); 