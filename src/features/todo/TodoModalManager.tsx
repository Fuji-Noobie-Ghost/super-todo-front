import { AddOrEditTodoModal } from "./components/AddOrEditTodoModal";
import { DeleteTodoConfirmationModal } from "./components/DeleteTodoConfirmationModal";
import { useCreateTodo, useUpdateTodo, useDeleteTodo } from "./todo.mutations";
import type { CreateTodoSchema, UpdateTodoSchema } from "./todo.schema";
import type { Todo } from "./todo.types";
import { useTodoModal } from "./TodoModal";

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

    todoModal.closeAddOrEditModal()
  }

  const onDeleteConfirm = (todo: Todo) => {
    if (!todoModal) return

    deleteTodo.mutate(todo.id)
    todoModal.closeDeleteConfirmation()
  }

  return (
    <>
      <AddOrEditTodoModal
        isOpen={todoModal.isAddOrEditModalOpen}
        onClose={todoModal.closeAddOrEditModal}
        todo={todoModal.selectedTodo}
        onSubmit={createOrUpdate}
      />
      {todoModal.selectedTodo && 
        <DeleteTodoConfirmationModal
          isOpen={todoModal.isDeleteConfirmationOpen}
          onClose={todoModal.closeDeleteConfirmation}
          todo={todoModal.selectedTodo}
          onConfirm={onDeleteConfirm}
        />
      }
    </>
  )
}
