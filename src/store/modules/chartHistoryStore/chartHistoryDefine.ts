import { HistoryTargetTypeEnum, HistoryActionTypeEnum } from './chartHistoryStore.d'

export const historyActionTypeName = {
  [HistoryActionTypeEnum.ADD]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_88') : 'Mới'),
  [HistoryActionTypeEnum.DELETE]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_324') : 'xóa bỏ'),
  [HistoryActionTypeEnum.UPDATE]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_202') : 'gia hạn'),
  [HistoryActionTypeEnum.MOVE]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_243') : 'di chuyển'),
  [HistoryActionTypeEnum.PASTE]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_85') : 'Dán'),
  [HistoryActionTypeEnum.COPY]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_340') : 'sao chép'),
  [HistoryActionTypeEnum.CUT]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_214') : 'cắt'),
  [HistoryActionTypeEnum.TOP]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_396') : 'ghim lên trên'),
  [HistoryActionTypeEnum.BOTTOM]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_170') : 'đáy'),
  [HistoryActionTypeEnum.UP]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_237') : 'di chuyển lên'),
  [HistoryActionTypeEnum.DOWN]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_375') : 'di chuyển xuống'),
  [HistoryActionTypeEnum.GROUP]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_485') : 'theo nhóm'),
  [HistoryActionTypeEnum.UN_GROUP]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_266') : 'không có nguyên soái'),
  [HistoryActionTypeEnum.LOCK]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_206') : 'khóa'),
  [HistoryActionTypeEnum.UNLOCK]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_461') : 'Mở khóa'),
  [HistoryActionTypeEnum.HIDE]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_282') : 'trốn'),
  [HistoryActionTypeEnum.SHOW]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_257') : 'trình diễn'),

  [HistoryTargetTypeEnum.CANVAS]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_329') : 'Khởi tạo canvas')
}
