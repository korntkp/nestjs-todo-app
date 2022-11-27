import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoStatus } from './entities/todo.entity';

@Injectable()
export class TodoService {
  todoList: Todo[] = [];

  create(createTodoDto: CreateTodoDto) {
    const entity: Todo = {
      id: this.todoList.length,
      name: createTodoDto.name,
      description: createTodoDto.description,
      status: createTodoDto.status || TodoStatus.TODO,
    };

    this.todoList.push(entity);

    const result: CreateTodoDto = { ...entity };
    return result;
  }

  findAll() {
    const result: CreateTodoDto[] = this.todoList.map((todo) => ({
      id: todo.id,
      name: todo.name,
      description: todo.description,
      status: todo.status,
    }));
    return result;
  }

  findOne(id: number) {
    const todo = this.todoList.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo ID: ${id} not found`);
    }

    const result: CreateTodoDto = {
      ...todo,
    };
    return result;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todoEntityIndex = this.todoList.findIndex((todo) => todo.id === id);

    if (todoEntityIndex < 0) {
      throw new NotFoundException(`Todo ID: ${id} not found`);
    }

    const entity: Todo = {
      id: this.todoList[todoEntityIndex].id,
      name: updateTodoDto.name || this.todoList[todoEntityIndex].name,
      description:
        updateTodoDto.description || this.todoList[todoEntityIndex].description,
      status: updateTodoDto.status || this.todoList[todoEntityIndex].status,
    };

    this.todoList[todoEntityIndex] = entity;

    const result: CreateTodoDto = { ...entity };
    return result;
  }

  remove(id: number) {
    const todoEntityIndex = this.todoList.findIndex((todo) => todo.id === id);

    if (todoEntityIndex < 0) {
      throw new NotFoundException(`Todo ID: ${id} not found`);
    }

    this.todoList.splice(todoEntityIndex, 1);
    return `Deleted Todo ID: ${id} success`;
  }
}
