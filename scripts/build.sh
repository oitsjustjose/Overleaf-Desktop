echo "Cleaning"

rm -rf ./dist

echo "Compiling TypeScript"

tsc

echo "Building for Windows"

electron-builder --win

echo "Building for Linux"

electron-builder --linux

electron-builder --linux snap

echo "Done building, remember to push to snapcraft as well as build for macOS"
echo "Build for macOS using 'npm run dist:mac'"
echo "Push to SnapCraft using 'npm run dist:snapcraft'"