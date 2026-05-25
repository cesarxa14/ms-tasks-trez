import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

// 🔥 mismos enums (importante reutilizar)
export enum StatusEnum {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export enum PriorityEnum {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Schema({
  timestamps: true,
})
export class Task {

  @Prop({
    required: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
    type: String,
  })
  description: string;

  @Prop({
    required: true,
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;

  @Prop({
    required: true,
    enum: PriorityEnum,
  })
  priority: PriorityEnum;

  @Prop({
    required: true,
    type: String,
  })
  assignedTo: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);