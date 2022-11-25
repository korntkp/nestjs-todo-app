import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  todoList: Todo[] = [];

  create(createTodoDto: CreateTodoDto) {
    const entity: Todo = {
      id: this.todoList.length,
      name: createTodoDto.name,
      description: createTodoDto.description,
    };
    this.todoList.push(entity);
    return entity;
  }

  findAll() {
    return this.todoList;
  }

  findOne(id: number) {
    const todo = this.todoList.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo ID: ${id} not found`);
    }

    return todo;
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
    };

    this.todoList[todoEntityIndex] = entity;
    return entity;
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
