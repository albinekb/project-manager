import React from 'react'
import ProjectList from '../components/project-list'
import Project from '../components/project'
import AddProject from '../components/add-project'
import Notifications from '../components/notifications'
import { ProjectStore } from '../lib/store'
import App, { AppBar } from '../components/app'

export default class Start extends React.Component {
  state = { ready: false, projectIdOpen: null }
  componentDidMount() {
    this.projectStore = new ProjectStore()
    this.setState({ ready: true })
  }
  onProjectOpen = id => this.setState({ projectIdOpen: id })
  onRequestClose = id => this.setState({ projectIdOpen: null })
  render() {
    const { ready, projectIdOpen } = this.state
    if (!ready) return null
    return (
      <App>
        <AppBar />
        <div>
          {projectIdOpen && (
            <Project
              id={projectIdOpen}
              onRequestClose={this.onRequestClose}
              store={this.projectStore}
              project={this.projectStore.getProjectById(projectIdOpen)}
            />
          )}
          {/*<button onClick={() => this.projectStore.storeProjects()}>store</button>*/}
          <AddProject store={this.projectStore} />
          <ProjectList
            onProjectOpen={this.onProjectOpen}
            store={this.projectStore}
          />
        </div>
        <Notifications store={this.projectStore} />
      </App>
    )
  }
}
