import { IGetPaginatedTask } from "../interfaces/IGetPaginatedTasks";
import { PaginatedResponse } from "../interfaces/IPagination";
import { Task } from "../schemas/Task.schema";

export interface TasksRepository {
  findAll(data: IGetPaginatedTask): Promise<PaginatedResponse<Task>>;

  findById(id: string): Promise<Task | null>;

  create(data: Partial<Task>): Promise<Task>;

  update(data: UpdateTaskPayload): Promise<Task | null>;

  delete(id: string): Promise<Partial<Task> | null>;
}

export interface UpdateTaskPayload {
  id: string;
  body: Partial<Task>;
}