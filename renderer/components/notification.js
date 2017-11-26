import Button from './button'
import Transition from 'react-transition-group/Transition'
import { observer } from 'mobx-react'

const Action = ({ action, afterClick }) => (
  <Button
    style={{ pointerEvents: 'auto' }}
    variant="light"
    onClick={() => {
      action.onClick()
      afterClick()
    }}
  >
    {action.label}
  </Button>
)

const Actions = ({ actions, afterClick }) => {
  return actions.map((action, index) => (
    <Action afterClick={afterClick} action={action} key={index} />
  ))
}

const Spacer = ({ width, flex }) => <div style={{ width, flex }} />

const duration = 300
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
}

class Fade extends React.Component {
  state = { className: '' }
  componentDidMount() {
    this.setState({ className: 'mounted' })
  }

  render() {
    const { className } = this.state
    return (
      <div className={`root ${className}`}>
        {this.props.children}
        <style jsx>{`
          .root {
            opacity: 0;
          }
          .root.mounted {
            transition: all 1000ms ease;
            opacity: 1;
          }
        `}</style>
      </div>
    )
  }
}

const Notification = ({ notification }) => {
  return (
    <Fade in={true}>
      <div className="root">
        <span className="title">{notification.title || 'Notification'}</span>
        <Spacer width={100} />
        <Actions
          afterClick={notification.remove}
          actions={notification.actions}
        />
        <div
          className="bar"
          style={{ width: `${notification.percentageLeft * 100}%` }}
        />
        <style jsx>{`
          .title {
            flex: 1;
          }
          .root {
            background: black;
            color: white;
            padding: 10px 20px;
            border-radius: 3px;
            margin: 15px;
            margin-top: 0px;
            display: flex;
            flex-direction: row;
            position: relative;
            overflow: hidden;
          }
          .bar {
            background: rgba(255, 255, 255, 0.5);
            height: 2px;
            position: absolute;
            bottom: 0;
            left: 0;
            transition: 100ms ease all;
          }
        `}</style>
      </div>
    </Fade>
  )
}
export default observer(Notification)
