import React from 'react'
import ProjectList from '../components/project-list'
import AddProject from '../components/add-project'
import Notifications from '../components/notifications'
import { ProjectStore } from '../lib/store'
import App, { AppBar } from '../components/app'

export default class Start extends React.Component {
  state = { ready: false }
  componentDidMount() {
    this.projectStore = new ProjectStore()
    this.setState({ ready: true })
  }
  render() {
    const { ready } = this.state
    if (!ready) return null
    return (
      <App>
        <AppBar />
        {/*<button onClick={() => this.projectStore.storeProjects()}>store</button>*/}
        <AddProject store={this.projectStore} />
        <ProjectList store={this.projectStore} />
        <Notifications store={this.projectStore} />
      </App>
    )
  }
}
