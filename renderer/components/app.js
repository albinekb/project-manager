import React from 'react'
export default class App extends React.Component {
  render() {
    return (
      <div>
        <style jsx global>{`
          body,
          html {
            font-family: sans-serif;
            overflow: hidden;
          }
          * {
            box-sizing: border-box;
          }
          main {
            top: 0;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            position: absolute;
            -webkit-app-region: drag;
            background: white;
          }
        `}</style>
        <main>{this.props.children}</main>
      </div>
    )
  }
}

export const AppBar = ({}) => (
  <div className="root">
    <style jsx>{`
      .root {
        height: 22px;
        margin-bottom: 20px
        background-image: linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%);
      }
    `}</style>
  </div>
)
