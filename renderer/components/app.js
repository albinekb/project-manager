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
            overflow-y: hidden;
            background-color: #f1f1f1;
          }

          main::-webkit-scrollbar {
            width: 8px;

            background: rgba(255, 255, 255, 0);
          }

          main::-webkit-scrollbar-thumb:window-inactive,
          main::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.5);
            border-radius: 5px;
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
        margin-bottom: 20px;
        position: sticky;
        top: 0px;
        right: 0;
      }
    `}</style>
  </div>
)
