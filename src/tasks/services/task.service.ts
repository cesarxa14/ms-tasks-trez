import { Inject, Injectable } from "@nestjs/common";
import { Task } from "../schemas/Task.schema";
import { RpcException } from "@nestjs/microservices";
import type { TasksRepository } from "../repositories/task.repository.interface";


@Injectable()
export class TaskService {

    constructor(
        @Inject('TasksRepository')
        private readonly tasksRepository: TasksRepository,
    ){}

    async create(payload: Partial<Task>){
        try{
            console.log('payload: ', payload)
            const task = this.tasksRepository.create(payload);
            return task;
        }catch(err){
            console.log('err: ', err)
            throw err;
        }
    }

    async getAllTasksFilter(data: any){
        try{
            const tasks = await this.tasksRepository.findAll(data);
            return tasks;
        }catch(err){
            console.log('err: ', err)
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
            console.log('task: ', {task, id})
            return task;
        }catch(err){
            console.log('err: ', err)
            throw err;
        }
    }

    async updateTask(payload: any){
        try{
            const tasks = await this.tasksRepository.update(payload);
            return tasks;
        }catch(err){
            console.log('err: ', err)
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
            console.log('task deleted: ', task)
            return task;
        }catch(err){
            console.log('err: ', err)
            throw err;
        }
    }
} 