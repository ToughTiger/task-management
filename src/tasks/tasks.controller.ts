import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { taskStatus } from './entities/task.entity';
import { TaskStausValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskFilterDto } from './dto/task-filetr.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query(ValidationPipe) taskFilterDto: TaskFilterDto) {
    return this.tasksService.getTasks(taskFilterDto);

    // if (Object.keys(taskFilterDto).length) {
    //   return this.tasksService.getTasksWithFilter(taskFilterDto);
    // } else {
    //   return this.tasksService.findAll();
    // }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id/status')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStausValidationPipe) status: taskStatus,
  ) {
    return this.tasksService.update(+id, status);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.tasksService.remove(+id);
  }
}
