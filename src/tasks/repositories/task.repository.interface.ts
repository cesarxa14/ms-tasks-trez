import { Task } from "../schemas/Task.schema";

export interface TasksRepository {
  findAll(data: any): Promise<any>;

  findById(id: string): Promise<Task | null>;

  create(data: Partial<Task>): Promise<Task>;

  update(data: any): Promise<Task | null>;

  delete(id: string): Promise<any>;
}