import electron, { screen, BrowserWindow } from 'electron'
import { download } from 'electron-dl'
import path from 'path'
import fs from 'fs'

export default async (url: string, mw: BrowserWindow) => {
    const scr = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
    const bw = new BrowserWindow({
        width: scr.bounds.width / 3,
        height: scr.bounds.height,
        x: 0,
        y: 0,
        webPreferences: {
            plugins: true,
        },
        parent: mw
    })

    const base = (electron.app || electron.remote.app).getPath('userData')
    const downloadDir = path.join(base, '/download/')

    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir)
    }

    const filepath = path.join(base, '/download/tmp.pdf')

    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath)
    }

    await download(mw, url, {
        directory: downloadDir,
        filename: 'tmp.pdf',
    })

    await bw.loadURL(`file://${filepath}`)

    return bw
}
