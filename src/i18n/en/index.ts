import phase7 from './phase7'
import phase5 from './phase5'
import global_extra from './global'
import login from './login'
import project from './project'
import edit from './edit'
import packages from './packages'
import views_components from './views_components'

const global = {
  ...global_extra,
  doc_addr: 'Document',
  code_addr: 'Code',
  form_account: 'Please enter your account or email',
  form_password: 'Please enter your password',
  // header
  doc: 'Document',
  help: 'Help',
  contact: 'About Software',
  logout: 'Logout',
  // system setting
  sys_set: 'System Setting',
  lang_set: 'Language Setting',
  // right key
  r_edit: 'Edit',
  r_preview: 'Preview',
  r_copy: 'Clone',
  r_rename: 'Rename',
  r_publish: 'Publish',
  r_unpublish: 'Unpublish',
  r_download: 'Download',
  r_delete: 'Delete',
  r_more: 'More',
  r_close: 'Close',
  r_zoom_in: 'Zoom In',
  r_zoom_out: 'Zoom Out',
  icp: 'ICP 2021034585-1',
}

export default {
  phase7,
  phase5,
  global,
  ...login,
  ...project,
  ...edit,
  packages,
  views_components
}
