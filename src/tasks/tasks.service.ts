import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  getAllTasks(): {
    success: boolean;
    message: string;
    data: Task[];
  } {
    return {
      success: true,
      message: 'Tasks found successfully',
      data: this.tasks,
    };
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): {
    success: boolean;
    message: string;
    data: Task[];
  } {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks().data;

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return {
      success: true,
      message: 'Tasks found successfully',
      data: tasks,
    };
  }

  getTaskById(id: string): { success: boolean; message: string; data: Task } {
    const foundTask = this.tasks.find((task) => task.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return {
      success: true,
      message: 'Task found successfully',
      data: foundTask,
    };
  }

  createTask(createTaskDto: CreateTaskDto): {
    success: boolean;
    message: string;
    data: Task;
  } {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return {
      success: true,
      message: 'Task created successfully',
      data: task,
    };
  }

  deleteTaskById(id: string): {
    success: boolean;
    message: string;
    deletedId: string;
  } {
    const foundTask = this.getTaskById(id).data;
    this.tasks.splice(this.tasks.indexOf(foundTask), 1);

    return {
      success: true,
      message: 'Task deleted successfully',
      deletedId: foundTask.id,
    };
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    let task = this.getTaskById(id).data;
    task = {
      ...task,
      id,
      ...updateTaskDto,
    };
    return {
      success: true,
      message: 'Task updated successfully',
      data: task,
    };
  }
}
