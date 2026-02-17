import z from "zod";
import { TodoStatus } from "./todo.types";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export const createTodoSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(500),
  status: z.enum(TodoStatus).optional(),
  dueDate: z
    .custom<Dayjs>(
      (val) => dayjs.isDayjs(val),
      { message: 'Due date is required' }
    )
    .transform((val) => val.toDate())
    .refine(
      (val) => val > new Date(),
      { message: 'Due date must be in the future' }
    ),
})


export type CreateTodoFormValues = z.input<typeof createTodoSchema>

export type CreateTodoSchema = z.output<typeof createTodoSchema>
export type UpdateTodoSchema = Partial<CreateTodoSchema>
