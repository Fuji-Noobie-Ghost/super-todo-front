import { Box, List } from "@mui/material"
import { TodoStatus, type Todo } from "../todo.types"
import { TodoItem } from "./TodoItem"
import { useTodoModal } from "../TodoModal"
import { useDeleteTodo, useUpdateTodo } from "../todo.mutations"

interface TodoListProps {
  todos: Todo[]
}

export function TodoList({ todos }: TodoListProps) {
  const todoModal = useTodoModal() 
  const updateTodo = useUpdateTodo()
  const deleteTodo = useDeleteTodo()

  const onStatusToggle = (todo: Todo) => {
    updateTodo.mutate({
      id: todo.id,
      payload: {
        status: todo.status === TodoStatus.COMPLETED
          ? TodoStatus.PENDING
          : TodoStatus.COMPLETED
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
              opacity: deleteTodo.isPending && todoModal.selectedTodo?.id == todo.id ? '0.5' : '1',
            }}
          >
            <TodoItem
              todo={todo}
              toggleStatus={onStatusToggle}
              onEdit={todoModal.openAddOrEditModal}
              onDelete={todoModal.openDeleteConfirmation}
            />
          </Box>
        ))}
      </List> 
    </>
  )
}
