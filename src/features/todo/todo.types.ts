export enum TodoStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export interface Todo {
  id: number
  title: string
  description: string
  status: TodoStatus
  dueDate: Date
  createdAt: Date
  updatedAt: Date
}

