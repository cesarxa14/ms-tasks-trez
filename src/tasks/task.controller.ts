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
    findAll(){
        const tasks = this.taskService.getAllTasksFilter(); 
        return tasks;
    }

    @MessagePattern('tasks.findOne')
    findOne(@Payload() data: any){
        const newTask = this.taskService.getTaskById(data); 
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