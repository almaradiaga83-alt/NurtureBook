#!/bin/bash

# NurtureBook Test Script
# Run this after completing iOS setup

echo "🧪 Testing NurtureBook iOS Setup..."

# Check Xcode
echo "🔍 Checking Xcode installation..."
if [ -d "/Applications/Xcode.app" ]; then
    echo "✅ Xcode is installed"
else
    echo "❌ Xcode not found"
    exit 1
fi

# Check Xcode command line tools
echo "🔍 Checking Xcode command line tools..."
if xcode-select --print-path | grep -q "Xcode.app"; then
    echo "✅ Xcode command line tools configured"
else
    echo "❌ Xcode command line tools not configured"
    echo "   Run: sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer"
    exit 1
fi

# Check CocoaPods
echo "🔍 Checking CocoaPods..."
if command -v pod &> /dev/null; then
    echo "✅ CocoaPods is installed"
    pod --version
else
    echo "❌ CocoaPods not found"
    echo "   Run: sudo gem install cocoapods"
    exit 1
fi

# Check if pods are installed
echo "🔍 Checking iOS dependencies..."
if [ -d "ios/Pods" ]; then
    echo "✅ iOS dependencies installed"
else
    echo "❌ iOS dependencies not installed"
    echo "   Run: cd ios && pod install && cd .."
    exit 1
fi

# Check Node modules
echo "🔍 Checking Node.js dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ Node.js dependencies installed"
else
    echo "❌ Node.js dependencies not installed"
    echo "   Run: npm install"
    exit 1
fi

echo ""
echo "🎉 All checks passed! You're ready to run the app."
echo ""
echo "To start the app:"
echo "1. Terminal 1: npm start"
echo "2. Terminal 2: npm run ios"
echo ""
echo "The app should launch in the iOS Simulator!"
