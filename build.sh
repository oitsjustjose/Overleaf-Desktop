echo "Cleaning"

rm -rf ./dist

#echo "Building for Windows"

#electron-builder . --win

echo "Building for macOS"

electron-builder .

echo "Building for Linux"

electron-builder . --linux

electron-builder . --linux snap

snapcraft push --release=stable dist/Overleaf_*.snap

echo "Done!"

open ./dist
