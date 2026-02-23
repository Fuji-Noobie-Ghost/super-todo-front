import { createContext, useContext, useState, type ReactNode } from "react";
import type { Todo } from "./todo.types";

interface ITodoModalContext {
  isAddOrEditModalOpen: boolean
  isDeleteConfirmationOpen: boolean
  isDetailOpen: boolean
  openDeleteConfirmation: (todo: Todo) => void
  closeDeleteConfirmation: () => void
  openAddOrEditModal: (todo: Todo | null) => void
  closeAddOrEditModal: () => void
  openTodoDetail: (todo: Todo) => void
  closeTodoDetail: () => void
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
  const [isDetailOpen, setIsDetailOpen] = useState(false)

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
    setIsAddOrEditModalOpen(false)
    setSelectedTodo(null)
  }

  const openTodoDetail = (todo: Todo) => {
    setSelectedTodo(todo)
    setIsDetailOpen(true)
  }

  const closeTodoDetail = () => {
    setIsDetailOpen(false)
    setSelectedTodo(null)
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
        isDetailOpen,
        openTodoDetail,
        closeTodoDetail,
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
