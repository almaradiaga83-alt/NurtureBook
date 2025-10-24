#!/usr/bin/env node

/**
 * Generate basic placeholder assets for Expo
 */

const fs = require('fs');

// Create a simple SVG icon
const iconSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#3b5249" rx="200"/>
  <text x="512" y="600" font-family="Arial, sans-serif" font-size="400" font-weight="bold" text-anchor="middle" fill="#f4c2c2">N</text>
</svg>
`;

// Create splash screen SVG
const splashSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#3b5249"/>
  <text x="512" y="500" font-family="Arial, sans-serif" font-size="120" font-weight="bold" text-anchor="middle" fill="#f4c2c2">NurtureBook</text>
  <text x="512" y="600" font-family="Arial, sans-serif" font-size="40" text-anchor="middle" fill="#ffffff">Parenting Companion</text>
</svg>
`;

// Create favicon SVG
const faviconSvg = `
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="#3b5249" rx="6"/>
  <text x="16" y="22" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="#f4c2c2">N</text>
</svg>
`;

// Write SVG files
fs.writeFileSync('assets/icon.svg', iconSvg);
fs.writeFileSync('assets/splash.svg', splashSvg);
fs.writeFileSync('assets/favicon.svg', faviconSvg);

console.log('✅ Created placeholder SVG assets');
console.log('📱 Note: For production, replace these with proper PNG images');
console.log('   - assets/icon.png (1024x1024)');
console.log('   - assets/splash.png (1024x1024)');
console.log('   - assets/adaptive-icon.png (1024x1024)');
console.log('   - assets/favicon.png (32x32)');
