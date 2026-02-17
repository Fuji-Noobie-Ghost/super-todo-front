import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { TodoList } from "../components/TodoList";
import { Add, ErrorOutline } from "@mui/icons-material";
import { useTodoModal } from "../TodoModal";
import { useTodos } from "../todo.queries";
import { TodoModalManager } from "../TodoModalManager";

export function TodoListPage() {
  const todoModal = useTodoModal()
  const todoQuery = useTodos()

  return (
    <Box sx={{ height: '98vh', display: 'flex', justifyContent: 'center' }}>
      <Container maxWidth='sm' sx={{ padding: '48px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box>
          <Typography variant="h4">Make your</Typography>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }} >Super Todo</Typography>
        </Box>

        <Button
          variant="contained"
          sx={{ boxShadow: 'none', width: 'fit-content' }}
          onClick={() => todoModal.openAddOrEditModal(null)}
        >
          <Add sx={{ mr: '4px' }} />
          New Todo
        </Button>

        {todoQuery.isLoading &&
          <Box >
            <CircularProgress size='3rem' />
          </Box>
        }
        {todoQuery.isError &&
          <Box sx={{ display: 'flex', gap: '0.2rem' }}>
            <ErrorOutline color="error" />
            <Typography color="error">{todoQuery.error.message}</Typography>
          </Box>
        }
        {todoQuery.isSuccess && <TodoList todos={todoQuery.data} /> }
      </Container>
      <TodoModalManager />
    </Box>
  )
}
