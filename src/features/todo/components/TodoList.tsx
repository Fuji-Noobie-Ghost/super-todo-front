import { List } from "@mui/material"
import type { Todo } from "../todo.types"
import { TodoItem } from "./TodoItem"

interface TodoListProps {
  todos: Todo[]
}

export function TodoList({ todos }: TodoListProps) {
  return (
    <List>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </List>
  )
}
