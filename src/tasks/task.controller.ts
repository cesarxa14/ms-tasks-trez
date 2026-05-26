import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { TaskService } from "./services/task.service";

@Controller()
export class TaskController {

    constructor(private readonly taskService: TaskService) {}

    @MessagePattern('tasks.create')
    create(@Payload() data: any){
        const newTask = this.taskService.create(data); 
        return newTask
    }

    @MessagePattern('tasks.findAll')
    findAll(@Payload() data: any){
        const tasks = this.taskService.getAllTasksFilter(data); 
        return tasks;
    }

    @MessagePattern('tasks.findOne')
    findOne(@Payload() data: any){
        const task = this.taskService.getTaskById(data); 
        return task;
    }

    @MessagePattern('tasks.update')
    update(@Payload() data: any){
        const updatedTask = this.taskService.updateTask(data); 
        return updatedTask;
    }

    @MessagePattern('tasks.delete')
    delete(@Payload() data: any){
        const deletedtask = this.taskService.deleteTask(data); 
        return deletedtask;
    }
}