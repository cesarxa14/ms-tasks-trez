import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "../schemas/Task.schema";
import { Model } from "mongoose";


@Injectable()
export class TasksRepository {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(data: Partial<Task>): Promise<Task> {
    return this.taskModel.create(data);
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().lean(); // todo tengo que hacerlo con paginado y filtrado
  }

  async findById(id: string): Promise<Task | null> {
    return this.taskModel.findById(id).lean();
  }

  async update(payload: any): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(payload.id, payload.body, {
      new: true,
    }).lean();
  }

  async delete(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id);
  }



}