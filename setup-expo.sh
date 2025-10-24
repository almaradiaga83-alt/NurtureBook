#!/bin/bash

# NurtureBook Expo Setup Script
# This script sets up the app for testing with Expo Go

echo "📱 Setting up NurtureBook for Expo Go testing..."

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "❌ Expo CLI not found! Installing..."
    npm install -g @expo/cli
fi

echo "✅ Expo CLI ready!"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create basic assets if they don't exist
if [ ! -d "assets" ]; then
    echo "🎨 Creating basic assets..."
    mkdir -p assets
    node create-assets.js
fi

echo "🎉 Setup complete!"
echo ""
echo "📱 Next steps:"
echo "1. Install Expo Go app on your iPhone from the App Store"
echo "2. Run: npm run expo"
echo "3. Scan the QR code with your iPhone camera or Expo Go app"
echo ""
echo "🚀 The app will load on your iPhone!"
