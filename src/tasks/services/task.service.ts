import { Injectable } from "@nestjs/common";
import { TasksRepository } from "../repositories/task.repository";
import { Task } from "../schemas/Task.schema";


@Injectable()
export class TaskService {

    constructor(
        private readonly tasksRepository: TasksRepository
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

    async getAllTasksFilter(){
        try{
            const tasks = this.tasksRepository.findAll();
            return tasks;
        }catch(err){
            console.log('err: ', err)
            throw err;
        }
    }

    async getTaskById(id: string){
        try{
            const task = this.tasksRepository.findById(id);
            return task;
        }catch(err){
            console.log('err: ', err)
            throw err;
        }
    }

    async updateTask(payload: any){
        try{
            const tasks = this.tasksRepository.update(payload);
            return tasks;
        }catch(err){
            console.log('err: ', err)
            throw err;
        }
    }

    async deleteTask(id: string){
        try{
            const tasks = this.tasksRepository.delete(id);
            return tasks;
        }catch(err){
            console.log('err: ', err)
            throw err;
        }
    }
}