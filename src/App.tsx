import { TodoListPage } from "./features/todo/pages/TodoListPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoListPage />
    </QueryClientProvider>
  )
}
