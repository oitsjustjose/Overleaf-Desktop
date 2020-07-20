import { app, BrowserWindow, Menu } from 'electron'
import MakeWindow from './app/mw'
import { getMenu } from './utils/utils'
import contextMenu from 'electron-context-menu'

let window: BrowserWindow | null = null

const initEvts = () => {
    app.on('window-all-closed', () => {
        window?.webContents.session.flushStorageData()
        window = null
        if (process.platform != 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (!window) {
            window = MakeWindow()
            Menu.setApplicationMenu(Menu.buildFromTemplate(getMenu()))
        }
    })

    app.on('ready', () => {
        if (app.isPackaged) {
            contextMenu({
                showSaveImage: false,
                showSaveImageAs: false,
                showCopyImage: false,
                showCopyImageAddress: false
            })
        } else {
            contextMenu({
                showInspectElement: true
            })
        }

        window = MakeWindow()
        Menu.setApplicationMenu(Menu.buildFromTemplate(getMenu()))
    })
}

initEvts()