import React from 'react'
import { withFormik } from 'formik'

import * as fs from 'fs-extra'

import Button from './button'

const isFolder = async path => {
  const stats = await fs.lstat(path)
  return stats.isDirectory()
}

export default class FolderPicker extends React.Component {
  onClick = async () => {
    const picked = require('electron').remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
    })

    if (picked.length !== 1) {
      throw new Error('Only one directory')
    }
    const [path] = picked
    const { store } = this.props
    store.createProject({ path })
  }

  render() {
    const { value, error } = this.props
    return (
      <span>
        <Button onClick={this.onClick}>Add folder</Button>
      </span>
    )
  }
}
