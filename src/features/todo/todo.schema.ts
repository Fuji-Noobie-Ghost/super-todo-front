import z from "zod";
import { TodoStatus } from "./todo.types";

export const createTodoSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  status: z.enum(TodoStatus).optional()
})

export type CreateTodoSchema = z.infer<typeof createTodoSchema>
export type UpdateTodoSchema = Partial<CreateTodoSchema>
