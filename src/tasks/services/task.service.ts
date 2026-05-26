import { Inject, Injectable } from "@nestjs/common";
import { Task } from "../schemas/Task.schema";
import { RpcException } from "@nestjs/microservices";
import type { TasksRepository } from "../repositories/task.repository.interface";
import { IGetPaginatedTask } from "../interfaces/IGetPaginatedTasks";


@Injectable()
export class TaskService {

    constructor(
        @Inject('TasksRepository')
        private readonly tasksRepository: TasksRepository,
    ){}

    async create(payload: Partial<Task>){
        try{
            const task = this.tasksRepository.create(payload);
            return task;
        }catch(err){
            console.log('TaskService.create.err: ', err)
            throw err;
        }
    }

    async getAllTasksFilter(data: IGetPaginatedTask){
        try{
            const tasks = await this.tasksRepository.findAll(data);
            return tasks;
        }catch(err){
            console.log('TaskService.getAllTasksFilter.err: ', err)
            throw err;
        }
    }

    async getTaskById(id: string){
        try{
            const task = await this.tasksRepository.findById(id);
            if(!task) throw new RpcException({
                message: 'Task no existe en la BD',
                statusCode: 404,
            });
            return task;
        }catch(err){
            console.log('TaskService.getTaskById.err: ', err)
            throw err;
        }
    }

    async updateTask(payload: any){
        try{
            const tasks = await this.tasksRepository.update(payload);
            return tasks;
        }catch(err){
            console.log('TaskService.updateTask.err: ', err)
            throw err;
        }
    }

    async deleteTask(id: string){
        try{

            const existTask = await this.getTaskById(id);

            if(!existTask) throw new RpcException({
                message: 'Task no existe en la BD',
                statusCode: 404,
            });

            const task = await this.tasksRepository.delete(id);
            return task;
        }catch(err){
            console.log('TaskService.deleteTask.err: ', err)
            throw err;
        }
    }
} 