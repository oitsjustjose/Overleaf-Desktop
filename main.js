const electron = require('electron');
const path = require('path');
const shell = require('electron').shell;
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');
const contextMenu = require('electron-context-menu');

let mainWindow;

function otherMenu() {
  var template = [{
      label: 'Edit',
      submenu: [{
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          selector: 'undo:'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          selector: 'redo:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          selector: 'cut:'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          selector: 'copy:'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          selector: 'paste:'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          selector: 'selectAll:'
        }
      ]
    },
    {
      label: 'View',
      submenu: [{
          role: 'toggledevtools'
        },
        {
          type: 'separator'
        },
        {
          role: 'resetzoom'
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        },
        {
          type: 'separator'
        },
        {
          role: 'togglefullscreen'
        }
      ]
    },
    {
      label: 'Go',
      submenu: [{
        role: 'reload'
      }, {
        role: 'forcereload'
      }]
    }
  ];

  var menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
}

function macOSMenu() {
  var template = [{
      label: 'Overleaf Desktop',
      submenu: [{
          label: 'About Overleaf Desktop',
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [{
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          selector: 'undo:'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          selector: 'redo:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          selector: 'cut:'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          selector: 'copy:'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          selector: 'paste:'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          selector: 'selectAll:'
        }
      ]
    },
    {
      label: 'View',
      submenu: [{
          role: 'toggledevtools'
        },
        {
          type: 'separator'
        },
        {
          role: 'resetzoom'
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        },
        {
          type: 'separator'
        },
        {
          role: 'togglefullscreen'
        }
      ]
    },
    {
      label: 'Go',
      submenu: [{
        role: 'reload'
      }, {
        role: 'forcereload'
      }]
    },
    {
      label: 'Window',
      submenu: [{
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          selector: 'performMiniaturize:'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          selector: 'performClose:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          selector: 'arrangeInFront:'
        }
      ]
    }
  ];

  var menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Overleaf Desktop',
    width: 800,
    height: 600,
    frame: process.platform != "darwin",
    titleBarStyle: process.platform == "darwin" ? 'hidden' : 'default',
    icon: path.join(__dirname, 'assets', 'icons', 'png', 'overleaf.png'),
    show: process.platform != "darwin",
    webPreferences: {
      nodeIntegration: false,
      nativeWindowOpen: true,
      preload: path.join(__dirname, 'preload')
    },
    transparent: process.platform == "darwin"
  });

  mainWindow.loadURL("https://v2.overleaf.com/");

  mainWindow.webContents.on('dom-ready', () => {
    addCustomCSS(mainWindow);
  });

  mainWindow.on('closed', function (event) {
    event.preventDefault();
  });

  mainWindow.webContents.on('new-window', function (e, url) {
    e.preventDefault();
    if (url.indexOf("v2.overleaf.com") != -1) {
      mainWindow.loadURL(url);
      addCustomCSS(mainWindow);
      mainWindow.webContents.session.flushStorageData();
    } else {
      shell.openExternal(url);
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });
}

function addCustomCSS(windowElement) {
  platform = process.platform == "darwin" ? "macos" : "";
  windowElement.webContents.insertCSS(
    fs.readFileSync(path.join(__dirname, 'assets', 'css', 'style.css'), 'utf8')
  );

  const platformCSSFile = path.join(
    __dirname,
    'assets',
    'css',
    `style.${platform}.css`
  );
  if (fs.existsSync(platformCSSFile)) {
    windowElement.webContents.insertCSS(
      fs.readFileSync(platformCSSFile, 'utf8')
    );
  }
}

function init() {
  app.setName("Overleaf Desktop");

  app.on('window-all-closed', function () {
    mainWindow.webContents.session.flushStorageData();
    mainWindow = null;
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on('activate', function () {
    if (mainWindow === null) {
      createWindow();
      // Dynamically pick a menu-type
      if (process.platform == "darwin") {
        macOSMenu();
      } else {
        otherMenu();
      }
    }
  });

  app.on('ready', function () {
    if (app.isPackaged) {
      contextMenu({
        shouldShowMenu: true
      });
    } else {
      contextMenu({
        shouldShowMenu: true,
        showInspectElement: true
      });
    }

    if (process.platform == "darwin") {
      app.dock.bounce("critical");
    }
    createWindow();

    // Dynamically pick a menu-type
    if (process.platform == "darwin") {
      macOSMenu();
    } else {
      otherMenu();
    }
  });
}

init();