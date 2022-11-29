import { Injectable, NotFoundException } from '@nestjs/common';
import * as dayjs from 'dayjs';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoStatus } from './enums/todo.enum';

@Injectable()
export class TodoService {
  todoList: Todo[] = [];

  create(createTodoDto: CreateTodoDto) {
    const entity: Todo = {
      id: this.todoList.length,
      name: createTodoDto.name,
      description: createTodoDto.description,
      status: createTodoDto.status || TodoStatus.TODO,
      startDate: createTodoDto.startDate || undefined,
      dueDate: createTodoDto.dueDate || undefined,
      createdDate: dayjs().toISOString(),
      updatedDate: dayjs().toISOString(),
    };

    this.todoList.push(entity);

    const result: CreateTodoDto = { ...entity };
    return result;
  }

  findAll() {
    const result: CreateTodoDto[] = this.todoList.map((todo) => ({
      ...todo,
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
      ...this.todoList[todoEntityIndex],
      name: updateTodoDto.name || this.todoList[todoEntityIndex].name,
      description: updateTodoDto.description || this.todoList[todoEntityIndex].description,
      status: updateTodoDto.status || this.todoList[todoEntityIndex].status,
      startDate: updateTodoDto.startDate || this.todoList[todoEntityIndex].startDate,
      dueDate: updateTodoDto.dueDate || this.todoList[todoEntityIndex].dueDate,
      updatedDate: dayjs().toISOString(),
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
