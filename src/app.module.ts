import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './tasks/task.controller';
import { TaskService } from './tasks/services/task.service';
import { TasksRepositoryImpl } from './tasks/repositories/task.repository.impl';
import { TaskSchema } from './tasks/schemas/Task.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    MongooseModule.forFeature([
                { name: 'Task', schema: TaskSchema },
            ]),
  ],
  controllers: [AppController, TaskController],
  providers: [
    AppService, 
    TaskService, 
    {
      provide: 'TasksRepository',
      useClass: TasksRepositoryImpl,
    }
  ],
})
export class AppModule {}
