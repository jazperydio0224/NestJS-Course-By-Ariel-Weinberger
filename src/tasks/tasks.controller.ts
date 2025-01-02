import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  ValidationPipe,
  Patch,
  Query,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './entities/tasks.entity';
import { TasksResponseDto } from './dto/tasks-response.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): {
  //   success: boolean;
  //   message: string;
  //   data: Task[];
  // } {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  @Get(':id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TasksResponseDto> {
    return this.tasksService.getTaskById(id);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDto: CreateTaskDto): {
  //   success: boolean;
  //   message: string;
  //   data: Task;
  // } {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Delete(':id')
  // deleteTaskById(@Param('id') id: string): {
  //   success: boolean;
  //   message: string;
  //   deletedId: string;
  // } {
  //   return this.tasksService.deleteTaskById(id);
  // }

  // @Patch('/:id')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body(TaskStatusValidationPipe) updateTaskDto: UpdateTaskDto,
  // ): {
  //   success: boolean;
  //   message: string;
  //   data: Task;
  // } {
  //   return this.tasksService.updateTask(id, updateTaskDto);
  // }
}
