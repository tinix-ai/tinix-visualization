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
  doc_addr: 'Tài liệu',
  code_addr: 'Mã nguồn',
  form_account: 'Vui lòng nhập tài khoản hoặc email',
  form_password: 'Vui lòng nhập mật khẩu',
  // header
  doc: 'Tài liệu',
  help: 'Trợ giúp',
  contact: 'Về phần mềm',
  logout: 'Đăng xuất',
  // system setting
  sys_set: 'Cài đặt hệ thống',
  lang_set: 'Cài đặt ngôn ngữ',
  // right key
  r_edit: 'Chỉnh sửa',
  r_preview: 'Xem trước',
  r_copy: 'Sao chép',
  r_rename: 'Đổi tên',
  r_publish: 'Phát hành',
  r_unpublish: 'Hủy phát hành',
  r_download: 'Tải xuống',
  r_delete: 'Xóa',
  r_more: 'Thêm',
  r_close: 'Đóng',
  r_zoom_in: 'Phóng to',
  r_zoom_out: 'Thu nhỏ',
  icp: 'ICP 2021034585-1',
}

export default {
  phase7,
  phase5,
  global,
  login,
  project,
  edit,
  packages,
  views_components
}
