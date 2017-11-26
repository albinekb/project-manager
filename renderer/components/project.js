import React from 'react'
import PropTypes from 'prop-types'

export default class Project extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }
  render() {
    const { name } = this.props
    return <div>{name}</div>
  }
}
