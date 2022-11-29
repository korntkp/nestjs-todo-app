import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TodoStatus } from '../enums/todo.enum';

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

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  // TODO: Custom Decorator MinDate(this.startDate)
  dueDate?: string;

  @IsOptional()
  createdDate?: string;
  @IsOptional()
  updatedDate?: string;
  @IsOptional()
  deletedDate?: string;
}
