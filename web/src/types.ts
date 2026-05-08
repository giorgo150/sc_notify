export type NotifyType = 'info' | 'success' | 'warning' | 'error'

export interface NotifyData {
  action:    'notify'
  type?:     NotifyType
  title?:    string
  message?:  string
  duration?: number
}

export interface NotifyItem {
  id:       number
  type:     NotifyType
  title:    string
  message:  string
  duration: number
}
