import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exception } from 'node:console';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filetr.dto';
import { Task, taskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = taskStatus.OPEN;
    this.taskRepository.save(task);
    return task;
  }

  async getTasks(taskFilterDto: TaskFilterDto): Promise<Task[]> {
    const { status, search } = taskFilterDto;
    const query = await this.taskRepository.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }


  async findOne(id: number): Promise<Task> {
    const taskFound = await this.taskRepository.findOne(id);
    if (!taskFound) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
    return taskFound;
  }

  async update(id: number, status: taskStatus): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async remove(id: number): Promise<any> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID : ${id} not found!`);
    } else {
      return `Task with ID: ${id} deleted successfully!`;
    }
  }
}
