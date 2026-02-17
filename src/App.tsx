import { TodoListPage } from "./features/todo/pages/TodoListPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TodoModalProvider } from "./features/todo/TodoModal";

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoModalProvider>
        <TodoListPage />
      </TodoModalProvider>
    </QueryClientProvider>
  )
}
