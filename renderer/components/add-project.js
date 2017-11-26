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
    const { store } = this.props
    const picked = require('electron').remote.dialog.showOpenDialog({
      properties: ['openDirectory', 'multiSelections'],
    })

    if (picked.length === 0) {
      throw new Error('No file picked?')
    }
    for (const pick of picked) {
      store.createProject({ path: pick })
    }
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
