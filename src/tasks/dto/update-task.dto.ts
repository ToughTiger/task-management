import { PartialType, PickType } from '@nestjs/mapped-types';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from './create-task.dto';

// export class UpdateTaskDto extends PartialType(CreateTaskDto) {

// }

export class UpdateTaskDto extends PickType(Task, [
   'status',
]) {}
