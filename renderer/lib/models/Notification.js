import { observable, autorun, computed } from 'mobx'
import * as fs from 'fs-extra'
import ProjectFolder from './ProjectFolder'
import uuid from 'uuid'

export default class Notification {
  id = null
  store = null
  duration = null
  @observable title = null
  @observable actions = []
  @observable timeLeft = 0
  constructor(
    store,
    { id: _id, actions, title, onTimeout, timeout = 5000 } = {},
  ) {
    const duration = timeout
    this.duration = timeout
    this.store = store
    this.id = _id || uuid.v4()
    this.title = title
    this.onTimeout = onTimeout
    if (actions) this.actions.replace(actions)
    this.timeLeft = duration
    const startedAt = Date.now()
    this.interval = setInterval(() => {
      const newTimeleft =
        Number.parseInt(Date.now() - (startedAt + duration)) * -1
      if (newTimeleft >= 0) this.timeLeft = newTimeleft
    }, 100)
    this.timeout = window.setTimeout(this.remove, timeout)
  }

  @computed
  get percentageLeft() {
    return this.timeLeft / this.duration
  }

  remove = () => {
    if (this.interval) window.clearInterval(this.interval)
    if (this.timeout) window.clearTimeout(this.timeout)
    if (this.onTimeout) this.onTimeout()
    this.store.removeNotification(this)
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
    console.log('dispose Notification')
    // clean up the observer
    // this.saveHandler()
  }
}
