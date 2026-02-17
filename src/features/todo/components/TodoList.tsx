import { Box, List } from "@mui/material"
import { TodoStatus, type Todo } from "../todo.types"
import { TodoItem } from "./TodoItem"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { todoService } from "../todo.service"
import { useState } from "react"
import { DeleteTodoConfirmationModal } from "./DeleteTodoConfirmationModal"
import type { UpdateTodoSchema } from "../todo.schema"

interface TodoListProps {
  todos: Todo[]
}

interface UpdateTodoParams {
  id: number
  payload: UpdateTodoSchema
}

export function TodoList({ todos }: TodoListProps) {
  const queryClient = useQueryClient()
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

  const todoDeleteMutation = useMutation({
    mutationFn: todoService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, payload }: UpdateTodoParams) => todoService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    onError: (error) => console.log(error)
  })

  const openConfirmationModal = (todo: Todo) => {
    setSelectedTodo(todo)
    setIsConfirmationModalOpen(true)
  }

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false)
  }

  const onConfirm = () => {
    if (!selectedTodo) return
    todoDeleteMutation.mutate(selectedTodo.id)
    setSelectedTodo(null)
    closeConfirmationModal()
  }

  const onStatusToggle = (todo: Todo) => {
    toggleStatusMutation.mutate({
      id: todo.id,
      payload: {
        status: todo.status === TodoStatus.COMPLETED
          ? TodoStatus.PENDING
          : TodoStatus.COMPLETED,
      }
    })
  }

  return (
    <>
      <List>
        {todos.map((todo) => (
          <Box
            key={todo.id}
            sx={{
              opacity: todoDeleteMutation.isPending && selectedTodo?.id == todo.id ? '0.5' : '1',
            }}
          >
            <TodoItem todo={todo} toggleStatus={onStatusToggle} onDelete={openConfirmationModal} />
          </Box>
        ))}
      </List>

      {selectedTodo && 
        <DeleteTodoConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={closeConfirmationModal}
          todo={selectedTodo}
          onConfirm={onConfirm}
        />
      }
    </>
  )
}
