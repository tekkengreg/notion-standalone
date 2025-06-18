const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure build directory exists
const buildDir = path.join(__dirname, '../build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Copy necessary files
const filesToCopy = [
  'main.js',
  'package.json',
  'build/entitlements.mac.plist'
];

// Create build directory structure
for (const file of filesToCopy) {
  const sourcePath = path.join(__dirname, '..', file);
  const targetPath = path.join(buildDir, file);
  
  // Create target directory if needed
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.copyFileSync(sourcePath, targetPath);
}

// Install dependencies
console.log('Installing dependencies...');
execSync('pnpm install', { cwd: buildDir, stdio: 'inherit' });

// Run the build
// console.log('Building the app...');
// const electronBuilderPath = path.join(buildDir, 'node_modules/.bin/electron-builder');
// execSync(`${electronBuilderPath} --mac --arm64`, { cwd: buildDir, stdio: 'inherit' });

console.log('Prebuild completed successfully!'); 