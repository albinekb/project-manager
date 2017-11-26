import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Button from './button'

const ProjectCell = ({ project }) => {
  const { id, path, status } = project
  return (
    <div className="root">
      <h3>{path}</h3>
      <div>
        <span className="status">{status}</span>
        <Button onClick={() => project.remove()}>remove</Button>
      </div>
      <style jsx>{`
        h3 {
          padding: 0;
          margin: 0;
        }
        .root {
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #ccc;
          margin: 10px 0px;
          padding: 10px 0px;
        }
        .status {
          font-size: 12px;
          font-weight: light;
          color: #fff;
          background: #000;
          padding: 3px 6px;
        }
      `}</style>
    </div>
  )
}
@observer
export default class Projects extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }
  render() {
    const { store } = this.props
    console.log('store.projects', store.projects)
    return (
      <div>
        {store.projects.map(project => (
          <ProjectCell project={project} key={project.id} />
        ))}
      </div>
    )
  }
}
