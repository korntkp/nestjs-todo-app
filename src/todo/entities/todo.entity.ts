export class Todo {
  id: number;
  name: string;
  description: string;
  status: TodoStatus;
}

export enum TodoStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}
