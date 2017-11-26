import React from 'react'
import { withFormik } from 'formik'

import * as fs from 'fs-extra'

const isFolder = async path => {
  const stats = await fs.lstat(path)
  return stats.isDirectory()
}

class FolderPicker extends React.Component {
  onClick = async () => {
    const picked = require('electron').remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
    })
    if (picked.length !== 0) {
      this.props.setFieldValue(this.props.id, picked[0])
    }
  }

  render() {
    const { value, error } = this.props
    return (
      <span>
        <button onClick={this.onClick}>{value || 'Pick folder'}</button>
        {error && <span class="error">{error}</span>}
      </span>
    )
  }
}

@withFormik({
  mapPropsToValues: props => ({
    name: '',
    path: '',
  }),
  handleSubmit: async (values, formikBag) => {
    const { store } = formikBag.props
    const { dialog } = require('electron').remote
  },
})
export default class extends React.Component {
  onCreateProject = () => {
    // store.createProject()
  }
  render() {
    const {
      handleSubmit,
      handleChange,
      handleBlur,
      errors,
      touched,
      dirty,
      isValid,
      values,
      setFieldTouched,
      setFieldValue,
    } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FolderPicker
          id="path"
          value={values.path}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          error={errors.path}
          touched={touched.path}
        />
        <button type="submit">create project</button>
      </form>
    )
  }
}
