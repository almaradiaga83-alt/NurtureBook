#!/bin/bash

# NurtureBook iOS Setup Script
# Run this script after installing Xcode from the App Store

echo "🍎 Setting up NurtureBook for iOS development..."

# Check if Xcode is installed
if [ ! -d "/Applications/Xcode.app" ]; then
    echo "❌ Xcode not found! Please install Xcode from the App Store first."
    echo "   Search for 'Xcode' in the App Store and install it."
    exit 1
fi

echo "✅ Xcode found!"

# Set Xcode as active developer directory
echo "🔧 Configuring Xcode command line tools..."
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer

# Accept Xcode license
echo "📝 Accepting Xcode license..."
sudo xcodebuild -license accept

# Install CocoaPods
echo "📦 Installing CocoaPods..."
if command -v brew &> /dev/null; then
    echo "   Using Homebrew to install CocoaPods..."
    brew install cocoapods
else
    echo "   Using gem to install CocoaPods..."
    sudo gem install cocoapods
fi

# Navigate to project directory
cd "$(dirname "$0")"

# Install iOS dependencies
echo "📱 Installing iOS dependencies..."
cd ios
pod install
cd ..

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start Metro bundler: npm start"
echo "2. In another terminal, run: npm run ios"
echo ""
echo "The app should launch in the iOS Simulator!"
