/**
 * Script to kill processes using a specific port
 * 
 * Usage: 
 * node src/scripts/kill-port.js 5001
 */

const { execSync } = require('child_process');
const os = require('os');

// Get the port from command line arguments or use 5001 as default
const port = process.argv[2] || 5001;

try {
  console.log(`Attempting to kill processes using port ${port}...`);
  
  // Different commands based on the OS
  if (os.platform() === 'win32') {
    // Windows
    const result = execSync(`netstat -ano | findstr :${port}`).toString();
    console.log('Found processes:');
    console.log(result);
    
    // Extract PID from the output (last column)
    const pidMatches = result.match(/\s+(\d+)$/m);
    if (pidMatches && pidMatches[1]) {
      const pid = pidMatches[1];
      console.log(`Killing process with PID: ${pid}`);
      execSync(`taskkill /F /PID ${pid}`);
      console.log(`Successfully killed process using port ${port}`);
    } else {
      console.log(`No process found using port ${port}`);
    }
  } else {
    // Linux/Mac
    execSync(`lsof -i :${port} | grep LISTEN | awk '{print $2}' | xargs kill -9`);
    console.log(`Successfully killed process using port ${port}`);
  }
} catch (error) {
  if (error.message.includes('no process found')) {
    console.log(`No process found using port ${port}`);
  } else {
    console.error(`Error killing process on port ${port}:`, error.message);
  }
} 