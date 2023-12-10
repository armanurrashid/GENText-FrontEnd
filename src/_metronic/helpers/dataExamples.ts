export interface MessageModel {
  user: number
  type: 'in' | 'out'
  text: string
  time: string
  template?: boolean
}

export interface UserInfoModel {
  initials?: {label: string; state: 'warning' | 'danger' | 'primary' | 'success' | 'info'}
  name: string
  avatar?: string
  email: string
  position: string
  online: boolean
}

export interface AlertModel {
  title: string
  description: string
  time: string
  icon: string
  state: 'primary' | 'danger' | 'warning' | 'success' | 'info'
}

export interface LogModel {
  code: string
  state: 'success' | 'danger' | 'warning'
  message: string
  time: string
}

const defaultLogs: Array<LogModel> = [
  // {code: '200 OK', state: 'success', message: 'New order', time: 'Just now'},
  // {code: '500 ERR', state: 'danger', message: 'New customer', time: '2 hrs'},
  // {code: '200 OK', state: 'success', message: 'Payment process', time: '5 hrs'},
  // {code: '300 WRN', state: 'warning', message: 'Search query', time: '2 days'},
  // {code: '200 OK', state: 'success', message: 'API connection', time: '1 week'},
  // {code: '200 OK', state: 'success', message: 'Database restore', time: 'Mar 5'},
  // {code: '300 WRN', state: 'warning', message: 'System update', time: 'May 15'},
  // {code: '300 WRN', state: 'warning', message: 'Server OS update', time: 'Apr 3'},
  // {code: '300 WRN', state: 'warning', message: 'API rollback', time: 'Jun 30'},
  // {code: '500 ERR', state: 'danger', message: 'Refund process', time: 'Jul 10'},
  // {code: '500 ERR', state: 'danger', message: 'Withdrawal process', time: 'Sep 10'},
  // {code: '500 ERR', state: 'danger', message: 'Mail tasks', time: 'Dec 10'},
]

export {defaultLogs}
