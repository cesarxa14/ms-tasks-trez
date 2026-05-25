import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './tasks/task.controller';
import { TaskService } from './tasks/services/task.service';
import { TasksRepository } from './tasks/repositories/task.repository';
import { TaskSchema } from './tasks/schemas/Task.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/tasks'),
    MongooseModule.forFeature([
                { name: 'Task', schema: TaskSchema },
            ]),
  ],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService, TasksRepository],
})
export class AppModule {}
