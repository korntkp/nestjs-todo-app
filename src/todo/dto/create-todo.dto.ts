import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TodoStatus } from '../entities/todo.entity';

export class CreateTodoDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
