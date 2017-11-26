import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import Notification from './notification'

@observer
export default class Notifications extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }
  render() {
    const { store } = this.props
    const notifications = store.notifications.map(notification => (
      <Notification key={notification.id} notification={notification} />
    ))
    if (notifications.length === 0) return null
    return (
      <div className="container">
        <div className="wrapper">{notifications}</div>
        <style jsx>{`
          .container {
            display: static;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            pointer-events: none;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          .wrapper {
            position: absolute;
            width: 100%;
            bottom: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    )
  }
}
