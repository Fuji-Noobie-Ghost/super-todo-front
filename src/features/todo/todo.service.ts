import type { AxiosInstance } from "axios";
import type { Todo } from "./todo.types";
import { apiClient } from "../../core/api/axios.config";
import type { CreateTodoSchema, UpdateTodoSchema } from "./todo.schema";

export abstract class TodoService {
  abstract getAll(): Promise<Todo[]>
  abstract create(todo: CreateTodoSchema): Promise<Todo>
  abstract update(id: number, payload: UpdateTodoSchema): Promise<Todo>
  abstract delete(id: number): Promise<void>
}

class TodoServiceImpl implements TodoService {
  private client: AxiosInstance

  constructor(client: AxiosInstance) {
    this.client = client
  }

  getAll = async (): Promise<Todo[]> => {
    try {
      const { data } = await this.client.get('/todo')
      return data
    } catch (error) {
      console.error(error)
      throw new Error('')
    }
  }

  create = async (todo: CreateTodoSchema): Promise<Todo> => {
    try {
      const { data } = await this.client.post('/todo', todo)
      return data
    } catch (error) {
      throw new Error('')
    }
  }

  update = async (id: number, payload: UpdateTodoSchema): Promise<Todo> => {
    try {
      const { data } = await this.client.patch(`/todo/${id}`, payload)
      return data
    } catch (error) {
      console.error(error)
      throw new Error('')
    }
  }

  delete = async (id: number): Promise<void> => {
    try {
      await this.client.delete(`/todo/${id}`)
    } catch (error) {
      console.error(error)
      throw new Error('')
    }
  }
}

export const todoService = new TodoServiceImpl(apiClient)
