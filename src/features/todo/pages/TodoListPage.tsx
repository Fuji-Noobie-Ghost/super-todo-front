import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { TodoList } from "../components/TodoList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../todo.service";
import { ErrorOutline } from "@mui/icons-material";

export function TodoListPage() {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getAll,
  })

  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
      <Container sx={{ width: '568px', padding: '48px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box>
          <Typography variant="h4">Make your</Typography>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }} >Super Todo</Typography>
        </Box>

        {query.isLoading &&
          <Box >
            <CircularProgress size='3rem' />
          </Box>
        }
        {query.isError &&
          <Box sx={{ display: 'flex', gap: '0.2rem' }}>
            <ErrorOutline color="error" />
            <Typography color="error">{query.error.message}</Typography>
          </Box>
        }
        {query.isSuccess && <TodoList todos={query.data} /> }
      </Container>
    </Box>
  )
}
