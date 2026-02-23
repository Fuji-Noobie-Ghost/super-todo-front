import { createContext, useContext, useState, type ReactNode } from "react";
import type { Todo } from "./todo.types";

interface ITodoModalContext {
  isModalOpen: boolean
  modalType: TodoModalType | null
  openDeleteConfirmation: (todo: Todo) => void
  openAddOrEditModal: (todo: Todo | null) => void
  openTodoDetail: (todo: Todo) => void
  closeModal: () => void
  selectedTodo: Todo | null
}

const TodoModalContext = createContext<ITodoModalContext | null>(null)

interface TodoModalProviderProps {
  children: ReactNode
}

export const TodoModalType = {
  DETAIL: 'DETAIL',
  ADD_OR_EDIT: 'ADD_OR_EDIT',
  DELETE_CONFIRMATION: 'DELETE_CONFIRMATION',
} as const

export type TodoModalType = typeof TodoModalType[keyof typeof TodoModalType]

export function TodoModalProvider({ children }: TodoModalProviderProps) {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [modalType, setModalType] = useState<TodoModalType | null>(null)

  const openDeleteConfirmation = (todo: Todo) => {
    setSelectedTodo(todo)
    setModalType(TodoModalType.DELETE_CONFIRMATION)
  }

  const closeModal = () => {
    setModalType(null)
    setSelectedTodo(null)
  }

  const openAddOrEditModal = (todo: Todo | null) => {
    setSelectedTodo(todo)
    setModalType(TodoModalType.ADD_OR_EDIT)
  }

  const openTodoDetail = (todo: Todo) => {
    setSelectedTodo(todo)
    setModalType(TodoModalType.DETAIL)
  }

  return (
    <TodoModalContext.Provider
      value={{
        isModalOpen: modalType !== null,
        modalType,
        openDeleteConfirmation,
        openAddOrEditModal,
        openTodoDetail,
        selectedTodo,
        closeModal,
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
