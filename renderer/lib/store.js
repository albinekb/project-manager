import { observable, autorun, computed } from 'mobx'
import * as fs from 'fs-extra'
import uuid from 'uuid'
import { join as pathJoin } from 'path'

import ProjectFolder from './models/ProjectFolder'
import Project from './models/Project'
import Notification from './models/Notification'

export class ProjectStore {
  @observable projects = []
  @observable notifications = []
  @observable isLoading = true

  constructor() {
    this.loadProjects()
  }

  @computed
  get allProjectPaths() {
    return this.projects.map(project => project.path)
  }

  storeProjects() {
    const projects = this.projects.map(project => {
      return { path: project.path, id: project.id }
    })

    console.log('projects', projects)

    window.localStorage.setItem('projects', JSON.stringify(projects))
  }

  loadProjects() {
    const _projects = window.localStorage.getItem('projects')
    if (_projects) {
      const projects = JSON.parse(_projects)
      projects.forEach(project => this.createProject(project))
    }
    // this.isLoading = true
    // const dirs = await fs.readdir(__dirname)
    // for (const dir of dirs) {
    //   const folder = await new ProjectFolder(this, {
    //     path: pathJoin(__dirname, dir),
    //   })
    //   if (!folder.error) {
    //     const project = this.createProject({ folder })
    //   }
    // }
    // this.isLoading = false
  }

  getProjectById(id) {
    return this.projects.find(project => project.id === id)
  }

  /**
   * Creates a fresh todo on the client and server
   */
  createProject({ path, folder, id } = {}) {
    const realPath = folder ? folder.path : path
    if (this.allProjectPaths.includes(realPath)) {
      throw new Error('Path already exists')
    }
    const project = new Project(this, { path, folder, id })
    this.projects.push(project)
    this.storeProjects()
    return project
  }
  removeNotification(notification) {
    this.notifications.splice(this.notifications.indexOf(notification), 1)
    notification.dispose()
  }
  showNotification(notificationOpts = {}) {
    const notification = new Notification(this, notificationOpts)
    this.notifications.push(notification)
  }

  /**
   * A todo was somehow deleted, clean it from the client memory
   */
  removeProject(project) {
    const indexOfProject = this.projects.indexOf(project)
    this.projects.splice(indexOfProject, 1)
    this.storeProjects()
    this.showNotification({
      title: `Project removed`,
      onTimeout: () => project.dispose(),
      actions: [
        {
          label: 'undo',
          onClick: () => {
            this.projects.splice(indexOfProject, 0, project)
            this.storeProjects()
          },
        },
      ],
    })
  }
}
