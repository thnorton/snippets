#!/bin/bash
set -e  # Exit on error

echo "Updating system packages..."
apt update

echo "Installing required packages..."
apt install -y nodejs npm python3 python3-pip
apt install -y curl git unzip

echo "Checking if Node.js is installed..."
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing latest LTS version..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | -E bash -
    apt install -y nodejs
fi

echo "Checking Node.js version..."
node -v
npm -v



echo "Installing npm dependencies..."
npm install

echo "Setup complete. You can now run the app with:"
echo "npm run dev"
