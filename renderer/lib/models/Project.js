import { observable, autorun, computed } from 'mobx'
import * as fs from 'fs-extra'
import ProjectFolder from './ProjectFolder'
import uuid from 'uuid'

export default class Project {
  id = null
  store = null
  folder = null

  @computed
  get path() {
    if (this.folder) {
      return this.folder.path
    }

    return null
  }
  @computed
  get status() {
    if (this.folder) {
      return this.folder.status
    }

    return 'MISSING_FOLDER'
  }

  remove() {
    this.store.removeProject(this)
  }

  constructor(store, { id: _id, path, folder } = {}) {
    this.store = store
    this.id = _id || uuid.v4()
    if (folder) {
      this.folder = folder
    }
    if (path && !this.folder) {
      this.folder = new ProjectFolder(store, { path })
    }
  }

  /**
  //  * Remove this todo from the client and server
  //  */
  // delete() {
  //   this.store.transportLayer.deleteTodo(this.id)
  //   this.store.removeTodo(this)
  // }

  // @computed
  // get asJson() {
  //   return {
  //     id: this.id,
  //     completed: this.completed,
  //     task: this.task,
  //     authorId: this.author ? this.author.id : null,
  //   }
  // }

  /**
   * Update this todo with information from the server
   */
  // updateFromJson(json) {
  //   // make sure our changes aren't send back to the server
  //   this.autoSave = false
  //   this.completed = json.completed
  //   this.task = json.task
  //   this.author = this.store.authorStore.resolveAuthor(json.authorId)
  //   this.autoSave = true
  // }

  dispose() {
    console.log('dispose project')
    // clean up the observer
    // this.saveHandler()
  }
}
