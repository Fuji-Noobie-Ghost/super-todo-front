import { createContext, useContext, useState, type ReactNode } from "react";
import type { Todo } from "./todo.types";

interface ITodoModalContext {
  isAddOrEditModalOpen: boolean
  isDeleteConfirmationOpen: boolean
  openDeleteConfirmation: (todo: Todo) => void
  closeDeleteConfirmation: () => void
  openAddOrEditModal: (todo: Todo | null) => void
  closeAddOrEditModal: () => void
  selectedTodo: Todo | null
}

const TodoModalContext = createContext<ITodoModalContext | null>(null)

interface TodoModalProviderProps {
  children: ReactNode
}

export function TodoModalProvider({ children }: TodoModalProviderProps) {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmation] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [isAddOrEditModalOpen, setIsAddOrEditModalOpen] = useState(false)

  const openDeleteConfirmation = (todo: Todo) => {
    setSelectedTodo(todo)
    setIsDeleteConfirmation(true)
  }

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmation(false)
    setSelectedTodo(null)
  }

  const openAddOrEditModal = (todo: Todo | null) => {
    setSelectedTodo(todo)
    setIsAddOrEditModalOpen(true)
  }

  const closeAddOrEditModal = () => {
    setSelectedTodo(null)
    setIsAddOrEditModalOpen(false)
  }

  return (
    <TodoModalContext.Provider
      value={{
        isDeleteConfirmationOpen,
        openDeleteConfirmation,
        closeDeleteConfirmation,
        isAddOrEditModalOpen,
        openAddOrEditModal,
        closeAddOrEditModal,
        selectedTodo,
      }}
    >
      {children}
    </TodoModalContext.Provider>
  )
}

export function useTodoModal() {
  const todoContext = useContext(TodoModalContext)
  if (!todoContext) throw new Error('useTodoModal should be wrapped inside TodoModalProvider')
  return todoContext
}
