import electron from 'electron'
import path from 'path'
import fs from 'fs'

interface StorageOptionsDefaults {
    autohideMenu: boolean,
    width: number,
    height: number,
    x: number,
    y: number
}

interface StorageOptions {
    configName: string,
    defaults: StorageOptionsDefaults
}

export default class Store {
    path: string
    data: any

    constructor(opts: StorageOptions) {
        const dataPath = (electron.app || electron.remote.app).getPath('userData')
        this.path = path.join(dataPath, opts.configName + '.json')
        this.data = parseDataFile(this.path, opts.defaults)
    }

    get(key: string) {
        return this.data[key]
    }

    set(key: string, val: any) {
        this.data[key] = val
        fs.writeFileSync(this.path, JSON.stringify(this.data))
    }

    all() {
        return (this.data as StorageOptionsDefaults)
    }
}

const isValidConfig = (input: any): input is StorageOptionsDefaults => {
    const schema: Record<keyof StorageOptionsDefaults, string> = {
        autohideMenu: 'boolean',
        width: 'number',
        height: 'number',
        x: 'number',
        y: 'number'
    }

    const missingProperties = Object.keys(schema)
        .filter(key => input[key] === undefined)
        .map(key => key as keyof StorageOptionsDefaults)
        .map(key => console.warn(`Config is missing ${key} ${schema[key]}`))

    // throw the errors if you choose
    return missingProperties.length === 0
}

const parseDataFile = (fp: string, defaults: StorageOptionsDefaults) => {
    try {
        const data = JSON.parse(fs.readFileSync(fp).toString())

        if (isValidConfig(data)) {
            return data
        }
        return defaults
    } catch (ex) {
        return defaults
    }
}