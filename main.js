const electron = require('electron');
const path = require('path');
const shell = require('electron').shell;
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');
const screen = require("electron").screen;
const PDFWindow = require("electron-pdf-window");
const contextMenu = require('electron-context-menu');

const getTemplate = require('./menu');
const updateWindowCoords = require("./window.js").updateWindowCoords;
const updateWindowDims = require("./window.js").updateWindowDims;
const getWindowData = require("./window.js").getWindowData;

let mainWindow = null;
let pdfWindow = null;

const showViewerWindow = (url) => {
    // Only update the url if it's already open
    if (pdfWindow !== null) {
        pdfWindow.loadURL(url);
        pdfWindow.focus();
    } else {
        let currScreen = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());

        pdfWindow = new PDFWindow({
            icon: path.join(__dirname, 'assets', 'icons', 'png', 'overleaf.png'),
            width: currScreen.bounds.width / 3,
            height: currScreen.bounds.height,
            x: 0,
            y: 0,
        });

        pdfWindow.once('ready-to-show', () => {
            pdfWindow.show();
            pdfWindow.focus();
        });

        pdfWindow.on('close', (e) => {
            pdfWindow = null;
        });

        pdfWindow.loadURL(url);
    }

};

const createEditorWindow = () => {
    let windowMeta = getWindowData();

    mainWindow = new BrowserWindow({
        title: 'Overleaf Desktop',
        width: windowMeta.width,
        height: windowMeta.height,
        x: windowMeta.x,
        y: windowMeta.y,
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

    mainWindow.on('close', (e) => {
        mainWindow.webContents.session.flushStorageData();
    });


    mainWindow.webContents.on('new-window', (e, url, frameName, disposition, options) => {
        e.preventDefault();
        if (url.indexOf("overleaf.com") != -1) {
            if (url.indexOf("pdf") != -1) {
                url = url.substr(0, url.indexOf('output.pdf?')) + 'output.pdf';
                showViewerWindow(url);
            } else {
                mainWindow.loadURL(url);
                mainWindow.webPreferences.preload = path.join(__dirname, 'preload');
                addCustomCSS(mainWindow);
                mainWindow.webContents.session.flushStorageData();
            }
        } else {
            shell.openExternal(url);
        }
    });

    mainWindow.on("move", (event) => {
        var bounds = mainWindow.getBounds();
        updateWindowCoords(bounds.x, bounds.y);
    });

    mainWindow.on("resize", (event) => {
        var bounds = mainWindow.getBounds();
        updateWindowDims(bounds.width, bounds.height);
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    });
};

const addCustomCSS = (windowElement) => {
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
};

const init = () => {
    app.on('window-all-closed', () => {
        mainWindow.webContents.session.flushStorageData();
        mainWindow = null;
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (mainWindow === null) {
            createEditorWindow();
            // Dynamically pick a menu-type
            let template = getTemplate(process.platform);
            let menu = Menu.buildFromTemplate(template);
            Menu.setApplicationMenu(menu);
        }
    });

    app.on('ready', () => {
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
        
        createEditorWindow();

        // Dynamically pick a menu-type
        let template = getTemplate(process.platform);
        let menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    });
};

init();