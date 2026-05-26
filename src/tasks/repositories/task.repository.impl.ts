import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "../schemas/Task.schema";
import { Model } from "mongoose";
import { TasksRepository, UpdateTaskPayload } from "./task.repository.interface";
import { IGetPaginatedTask } from "../interfaces/IGetPaginatedTasks";
import { PaginatedResponse } from "../interfaces/IPagination";


@Injectable()
export class TasksRepositoryImpl implements TasksRepository {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(data: Partial<Task>): Promise<Task> {
    return this.taskModel.create(data);
  }

  async findAll(data: IGetPaginatedTask): Promise<PaginatedResponse<Task>> {
    const { status, priority, page = '1', limit = '10' } = data;
    const filter: any = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const response = await this.taskModel
      .find(filter)
      .skip(skip)
      .limit(limitNumber)
      .exec();

    const total = await this.taskModel.countDocuments(filter)

    return {
      data: response,
      meta: {
        total,
        page: pageNumber,
        lastPage: Math.ceil(total / limitNumber),
      },
    };
  }

  async findById(id: string): Promise<Task | null> {
    return this.taskModel.findById(id).lean();
  }

  async update(payload: UpdateTaskPayload): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(payload.id, payload.body, {
      new: true,
    }).lean();
  }

  async delete(id: string): Promise<Task | null> {
    return await this.taskModel.findByIdAndDelete(id);
  }



}