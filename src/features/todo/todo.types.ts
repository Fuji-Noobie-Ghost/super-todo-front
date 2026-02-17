export const TodoStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const

// Recréer le type
export type TodoStatus = typeof TodoStatus[keyof typeof TodoStatus]

export interface Todo {
  id: number
  title: string
  description: string
  status: TodoStatus
  dueDate: Date
  createdAt: Date
  updatedAt: Date
}

