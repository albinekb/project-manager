import React from 'react'
import PropTypes from 'prop-types'

export default class Project extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }
  render() {
    const { id, project, onRequestClose } = this.props
    return (
      <div className="root">
        <div className="wrapper">
          {project.path}
          <button onClick={onRequestClose}>close</button>
        </div>
        <style jsx>{`
          .wrapper {
            box-shadow: 0px 0px 100px rgba(0, 0, 0, 1);
            min-width: 320px;
            min-height: 320px;
            color: white;
          }
          .root {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: black;
          }
        `}</style>
      </div>
    )
  }
}
