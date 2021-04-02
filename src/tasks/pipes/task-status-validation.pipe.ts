import { BadRequestException, PipeTransform } from '@nestjs/common';
import { taskStatus } from '../entities/task.entity';

export class TaskStausValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    taskStatus.OPEN,
    taskStatus.IN_PROGRESS,
    taskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
