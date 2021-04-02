import { IsIn, IsNotEmpty, isNotEmpty, IsOptional, IsString } from 'class-validator';
import { taskStatus } from '../entities/task.entity';

export class TaskFilterDto {
  @IsOptional()
  @IsIn([taskStatus.DONE, taskStatus.IN_PROGRESS, taskStatus.OPEN])
  status: taskStatus;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
