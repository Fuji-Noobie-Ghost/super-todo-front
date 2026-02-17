export enum TodoStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export interface Todo {
  id: number
  title: string
  description: string
  status: TodoStatus
  createdAt: Date
  updatedAt: Date
}

