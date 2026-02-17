import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateTodoSchema, UpdateTodoSchema } from "./todo.schema"
import { todoService } from "./todo.service"
import { todoKeys } from "./todo.queries"

export const useCreateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateTodoSchema) => todoService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all })
    },
    onError: (error) => {
      console.error('Failed to create todo:', error)
    },
  })
}

interface UpdateTodoParams {
  id: number
  payload: UpdateTodoSchema
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: UpdateTodoParams) => todoService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todoKeys.all })
  })
}

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: todoService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todoKeys.all }),
  })
}
