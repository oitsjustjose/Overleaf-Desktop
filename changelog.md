# Changelog

## 3.0.0

### Added

- Ability to auto-hide the menubar [#5](https://github.com/oitsjustjose/Overleaf-Desktop/issues/6)
- Added "Office" category to all Linux builds [#1](https://github.com/oitsjustjose/Overleaf-Desktop/issues/1)
- Better validation of the app's settings file - it'll now revert to a default one if there's a missing value or other error.

### Changed

- **Entire program has been re-written in TypeScript**
    - This means you should see fewer-to-no crashes!
    - Makes my life easier adding, fixing and removing code in the future
- **Build scripts using Docker for Cross-Platform Compilation on macOS**
    - See `scripts/docker.sh`.
    - Docker auto-loads `scripts/bashrc`.
    - Run with `npm run dist:allother`
- PDF viewer now works by locally downloading the PDF (still the same network overhead, just a forced workaround to a bug I had).
    - Previewing PDFs overwrites the old PDF on your drive to save storage
    - The temporary PDF download is deleted when quitting Overleaf Desktop
- PDF view now closes when the main IDE window is closed

### Fixed

- Overleaf Desktop not starting on Ubuntu (I've tested this on Ubuntu 18.04 and 20.04 under WSL2) [#4](https://github.com/oitsjustjose/Overleaf-Desktop/issues/4)

## 2.0.0

### Multi-Window Editing!!

You can now edit in one screen and view your PDF in another! Do so by maximizing the editor side, and the recompile button will be moved over! 

There is no "Download" button for the PDF anymore - click on the "open" icon in the editor pane to view the PDF and download it from there, all within Overleaf Desktop!

### All New Icon!

The leaf looks less...... amateur. I always liked the original Overleaf logo, but this vectorized leaf will have to do.

### More Stability / Less Crashes

### Automated building using GitHub Actions
