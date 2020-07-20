import electron from 'electron'
import fs from 'fs'
import path from 'path'

interface IDataSchema {
    'x': number,
    'y': number,
    'width': number,
    'height': number
}

interface IStoreOptions {
    configName: string,
    defaults: IDataSchema
}

export default class Store {
    path: string
    data: any

    constructor(opts: IStoreOptions) {
        const dataPath = (electron.app || electron.remote.app).getPath('userData')

        this.path = path.join(dataPath, opts.configName + '.json')
        this.data = parseFile(this.path, opts.defaults)
    }

    get(key: string) {
        return this.data[key]
    }

    set(key: string, val: boolean | number) {
        this.data = val
        fs.writeFileSync(this.path, JSON.stringify(this.data))
    }

    all() {
        return (this.data as IDataSchema)
    }
}

const parseFile = (fp: string, defaults: IDataSchema) => {
    try {
        return JSON.parse(fs.readFileSync(fp).toString())
    } catch (ex) {
        return defaults
    }
}