import { useQuery } from "@tanstack/react-query";
import { todoService } from "./todo.service";

export const todoKeys = {
  all: ['todos'] as const
}

export const useTodos = () => useQuery({
  queryKey: todoKeys.all,
  queryFn: todoService.getAll,
})
