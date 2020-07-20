import electron, { BrowserWindow, screen } from 'electron'
import { download } from 'electron-dl'
import fs from 'fs'
import path from 'path'

export default async (url: string, mw: BrowserWindow, pdfView: BrowserWindow | null) => {
    if (!pdfView) {
        const scr = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
        pdfView = new BrowserWindow({
            width: scr.bounds.width / 3,
            height: scr.bounds.height,
            x: 0,
            y: 0,
            webPreferences: {
                plugins: true,
            },
        })
    }

    const downloadDir = path.join((electron.app || electron.remote.app).getPath('userData'), '/download/')

    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir)
    }

    const filepath = path.join(downloadDir, '/tmp.pdf')

    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath)
    }

    await download(mw, url, {
        directory: downloadDir,
        filename: 'tmp.pdf',
    })

    await pdfView.loadURL(`file://${filepath}`)

    return pdfView
}
