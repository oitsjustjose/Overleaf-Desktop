import { MenuItemConstructorOptions } from 'electron'
import Store from '../app/store'

const store = new Store({
    configName: 'user-preferences',
    defaults: {
        width: 800,
        height: 600,
        x: 0,
        y: 0
    }
})

export const getWindow = () => {
    return store.all()
}

export const setWindow = (x: number, y: number, width: number, height: number) => {
    store.set('x', x)
    store.set('y', y)
    store.set('width', width)
    store.set('height', height)
}

const menu = () => {
    const tmpl: Array<MenuItemConstructorOptions> = [{
        label: 'Edit',
        submenu: [{
            role: 'undo'
        }, {
            role: 'redo'
        }, {
            type: 'separator'
        }, {
            role: 'cut'
        }, {
            role: 'copy'
        }, {
            role: 'paste'
        }, {
            role: 'pasteAndMatchStyle'
        }, {
            role: 'delete'
        }, {
            role: 'selectAll'
        }]
    }, {
        label: 'View',
        submenu: [{
            role: 'toggleDevTools'
        }, {
            type: 'separator'
        }, {
            role: 'resetZoom'
        }, {
            role: 'zoomIn'
        }, {
            role: 'zoomOut'
        }, {
            type: 'separator'
        }, {
            role: 'togglefullscreen'
        }]
    }, {
        label: 'Go',
        submenu: [{
            role: 'reload'
        }, {
            role: 'forceReload'
        }]
    }]

    return tmpl
}

const macOsMenu = () => {
    const tmpl: Array<MenuItemConstructorOptions> = [{
        label: 'Gmail Desktop',
        submenu: [{
            label: 'About Overleaf Desktop',
            role: 'about'
        }, {
            type: 'separator'
        }, {
            role: 'hide'
        }, {
            role: 'hideOthers'
        }, {
            role: 'unhide'
        }, {
            type: 'separator'
        }, {
            role: 'quit'
        }]
    }, {
        label: 'Edit',
        submenu: [{
            role: 'undo'
        }, {
            role: 'redo'
        }, {
            type: 'separator'
        }, {
            role: 'cut'
        }, {
            role: 'copy'
        }, {
            role: 'paste'
        }, {
            role: 'pasteAndMatchStyle'
        }, {
            role: 'delete'
        }, {
            role: 'selectAll'
        }]
    }, {
        label: 'View',
        submenu: [{
            role: 'toggleDevTools'
        }, {
            type: 'separator'
        }, {
            role: 'resetZoom'
        }, {
            role: 'zoomIn'
        }, {
            role: 'zoomOut'
        }, {
            type: 'separator'
        }, {
            role: 'togglefullscreen'
        }]
    }, {
        label: 'Go',
        submenu: [{
            role: 'reload'
        }, {
            role: 'forceReload'
        }]
    }, {
        label: 'Window',
        submenu: [{
            role: 'minimize'
        }, {
            role: 'close'
        }, {
            type: 'separator'
        }]
    }]

    return tmpl
}

export const getMenu = () => {
    return process.platform === 'darwin' ? macOsMenu() : menu()
}