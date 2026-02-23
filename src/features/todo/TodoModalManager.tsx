import { AddOrEditTodoModal } from "./components/AddOrEditTodoModal";
import { DeleteTodoConfirmationModal } from "./components/DeleteTodoConfirmationModal";
import { TodoDetailModal } from "./components/TodoDetailModal";
import { useCreateTodo, useUpdateTodo, useDeleteTodo } from "./todo.mutations";
import type { CreateTodoSchema, UpdateTodoSchema } from "./todo.schema";
import type { Todo } from "./todo.types";
import { TodoModalType, useTodoModal } from "./TodoModal";

export function TodoModalManager() {
  const todoModal = useTodoModal()
  const deleteTodo = useDeleteTodo()
  const createTodo = useCreateTodo()
  const updateTodo = useUpdateTodo()

  const createOrUpdate = (payload: CreateTodoSchema, todo?: Todo | null) => {
    if (todo) {
      const newPayload: UpdateTodoSchema = {}

      if (todo.title !== payload.title) newPayload.title = payload.title
      if (todo.description !== payload.description) newPayload.description = payload.description
      if (todo.dueDate !== payload.dueDate) newPayload.dueDate = payload.dueDate

      updateTodo.mutate({
        id: todo.id,
        payload: newPayload,
      })
    } else {
      createTodo.mutate(payload)
    }

    todoModal.closeModal()
  }

  const onDeleteConfirm = (todo: Todo) => {
    if (!todoModal) return

    deleteTodo.mutate(todo.id)
    todoModal.closeModal()
  }

  return (
    <>
      <AddOrEditTodoModal
        isOpen={todoModal.modalType == TodoModalType.ADD_OR_EDIT}
        onClose={todoModal.closeModal}
        todo={todoModal.selectedTodo}
        onSubmit={createOrUpdate}
      />

      {todoModal.selectedTodo && 
        <DeleteTodoConfirmationModal
          isOpen={todoModal.modalType == TodoModalType.DELETE_CONFIRMATION}
          onClose={todoModal.closeModal}
          todo={todoModal.selectedTodo}
          onConfirm={onDeleteConfirm}
        />
      }

      {todoModal.selectedTodo && 
        <TodoDetailModal
          isOpen={todoModal.modalType == TodoModalType.DETAIL}
          todo={todoModal.selectedTodo}
          onClose={todoModal.closeModal}
        />
      }
    </>
  )
}
