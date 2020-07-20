import { screen, BrowserWindow } from 'electron'
import path from 'path'

export default (url: string) => {
    const scr = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
    const pw = new BrowserWindow({
        icon: path.resolve(`${path.dirname(require.main!.filename)}/../assets/icons/png/overleaf.png`),
        width: scr.bounds.width / 3,
        height: scr.bounds.height,
        x: 0,
        y: 0,
        webPreferences: {
            plugins: true,
            nodeIntegration: true
        }
    })

    pw.loadURL(url)

    pw.once('ready-to-show', () => {
        pw.show()
        pw.focus()
    })

    return pw
}