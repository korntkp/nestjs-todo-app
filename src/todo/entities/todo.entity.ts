import { TodoStatus } from '../enums/todo.enum';

export class Todo {
  id: number;
  name: string;
  description: string;
  status: TodoStatus;
  startDate?: string;
  dueDate?: string;
  createdDate: string;
  updatedDate: string;
  deletedDate?: string;
}
