echo "Buildling Gmail for Windows"

electron-packager . "Overleaf Desktop" --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/overleaf.ico --prune=true --out=release-builds --version-string.CompanyName=oitsjustjose --version-string.FileDescription="A simple Gmail electron wrapper" --version-string.ProductName="Overleaf Desktop"

echo "Building Gmail for macOS"

electron-packager . --overwrite --platform=darwin --arch=x64 --icon=./assets/icons/macOS/overleaf.icns --prune=true --out=release-builds

echo "Building Gmail for Linux"

electron-packager . "Overleaf Desktop" --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/overleaf.png --prune=true --out=release-builds