import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { TaskService } from "./services/task.service";
import { Task } from "./schemas/Task.schema";
import type { IGetPaginatedTask } from "./interfaces/IGetPaginatedTasks";

@Controller()
export class TaskController {

    constructor(private readonly taskService: TaskService) {}

    @MessagePattern('tasks.create')
    create(@Payload() data: Partial<Task>){
        const newTask = this.taskService.create(data); 
        return newTask
    }

    @MessagePattern('tasks.findAll')
    findAll(@Payload() data: IGetPaginatedTask){
        const tasks = this.taskService.getAllTasksFilter(data); 
        return tasks;
    }

    @MessagePattern('tasks.findOne')
    findOne(@Payload() data: string){
        const task = this.taskService.getTaskById(data); 
        return task;
    }

    @MessagePattern('tasks.update')
    update(@Payload() data: Partial<Task>){
        const updatedTask = this.taskService.updateTask(data); 
        return updatedTask;
    }

    @MessagePattern('tasks.delete')
    delete(@Payload() id: string){
        const deletedtask = this.taskService.deleteTask(id); 
        return deletedtask;
    }
}