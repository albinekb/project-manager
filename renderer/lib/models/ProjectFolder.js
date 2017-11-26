import { observable, autorun, computed } from 'mobx'
import * as fs from 'fs-extra'
import uuid from 'uuid'

const isFolder = async path => {
  const stats = await fs.lstat(path)
  return stats.isDirectory()
}

export default class ProjectFolder {
  store = null
  @observable path = null
  @observable error = null
  @observable type = null

  constructor(store, { path } = {}) {
    this.store = store
    if (!path) throw new Error('Missing path')
    this.path = path
    this.init()
  }

  @computed
  get status() {
    if (this.error) return 'ERROR'
    if (!this.path) return 'NOT_LOADED'
    return 'LOADED'
  }

  async init() {
    if (!await isFolder(this.path)) {
      this.error = `${this.path} is not a folder`
    }
  }
}
