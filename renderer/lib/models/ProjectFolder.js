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
  @observable hasPackageJson = null
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

  async syncFs() {
    const dir = await fs.readdir(this.path)
    console.log('dir', dir)
    this.hasPackageJson = dir.includes('package.json')
    if (this.hasPackageJson) {
      this.type = 'npm'
    }
    if (dir.includes('yarn.lock')) {
      this.type = 'yarn'
    }
    if (dir.includes('index.html')) {
      this.type = 'html'
    }
  }

  async init() {
    if (!await isFolder(this.path)) {
      this.error = `${this.path} is not a folder`
    }
    await this.syncFs()
  }
}
