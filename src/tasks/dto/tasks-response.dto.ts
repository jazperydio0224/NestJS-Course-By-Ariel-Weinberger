import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { Tasks } from '../entities/tasks.entity';

export class TasksResponseDto {
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;

  @IsString()
  @IsNotEmpty()
  message: string;

  data: Tasks | Tasks[];
}
