interface Base {
  type: 'message' | 'notification' | 'event'
  id: string
  title: string
}

interface Notification extends Base {
  type: 'notification'
  read?: boolean
  avatar: string
  datetime: string
}

interface Message extends Base {
  type: 'message'
  read?: boolean
  avatar: string
  datetime: string
  description: string
  clickClose: boolean
}

interface Event extends Base {
  type: 'event'
  description: string
  extra: string
  status: string
}

export type Notice = Notification | Message | Event
