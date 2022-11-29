import { Test, TestingModule } from '@nestjs/testing';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from './enums/todo.enum';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;
  const id = 0;
  const notFoundId = 99;

  const createTodoDto: CreateTodoDto = {
    name: 'test name',
    description: 'Test desc',
  };
  const createdResultDto: CreateTodoDto = {
    id: 0,
    name: 'test name',
    description: 'Test desc',
    status: TodoStatus.TODO,
  };

  const updateTodoDto: UpdateTodoDto = {
    name: 'test name 123',
    description: 'Test desc 456',
    status: TodoStatus.DOING,
    startDate: '2019-01-25T02:00:00.000Z',
    dueDate: '2019-01-25T02:00:00.000Z',
  };
  const updatedResultDto: CreateTodoDto = {
    id: 0,
    name: 'test name 123',
    description: 'Test desc 456',
    status: TodoStatus.DOING,
    startDate: '2019-01-25T02:00:00.000Z',
    dueDate: '2019-01-25T02:00:00.000Z',
  };

  const resultNotFoundError = {
    statusCode: 404,
    message: `Todo ID: ${notFoundId} not found`,
    error: 'Not Found',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be []', () => {
    const todoList = controller.findAll();
    expect(todoList).toEqual([]);
  });

  it('create todo should be success', () => {
    const todoItem = controller.create(createTodoDto);

    expect(todoItem.name).toEqual(createdResultDto.name);
    expect(todoItem.description).toEqual(createdResultDto.description);
    expect(todoItem.status).toEqual(createdResultDto.status);
    expect(todoItem.createdDate).toBeDefined();
    expect(todoItem.updatedDate).toBeDefined();
  });

  it('findAll after create 1 todo should be 1 item', () => {
    controller.create(createTodoDto);
    const todoList = controller.findAll();

    expect(todoList[0].name).toEqual(createdResultDto.name);
    expect(todoList[0].description).toEqual(createdResultDto.description);
    expect(todoList[0].status).toEqual(createdResultDto.status);
    expect(todoList[0].createdDate).toBeDefined();
    expect(todoList[0].updatedDate).toBeDefined();
  });

  it('findOne ID 0 after create 1 todo should be success', () => {
    controller.create(createTodoDto);
    const todoItem = controller.findOne(id.toString());

    expect(todoItem.name).toEqual(createdResultDto.name);
    expect(todoItem.description).toEqual(createdResultDto.description);
    expect(todoItem.status).toEqual(createdResultDto.status);
    expect(todoItem.createdDate).toBeDefined();
    expect(todoItem.updatedDate).toBeDefined();
  });

  it('Create and Update todo and then findOne ID 0 should be success', () => {
    controller.create(createTodoDto);
    controller.update(id.toString(), updateTodoDto);
    const todoItem = controller.findOne(id.toString());

    expect(todoItem.name).toEqual(updatedResultDto.name);
    expect(todoItem.description).toEqual(updatedResultDto.description);
    expect(todoItem.status).toEqual(updatedResultDto.status);
    expect(todoItem.startDate).toEqual(updatedResultDto.startDate);
    expect(todoItem.dueDate).toEqual(updatedResultDto.dueDate);
    expect(todoItem.createdDate).toBeDefined();
    expect(todoItem.updatedDate).toBeDefined();
  });

  it('Create todo and Update nothing and then findOne ID 0 should be success', () => {
    controller.create(createTodoDto);
    controller.update(id.toString(), {});
    const todoItem = controller.findOne(id.toString());

    expect(todoItem.name).toEqual(createdResultDto.name);
    expect(todoItem.description).toEqual(createdResultDto.description);
    expect(todoItem.status).toEqual(createdResultDto.status);
    expect(todoItem.createdDate).toBeDefined();
    expect(todoItem.updatedDate).toBeDefined();
  });

  it('Remove todo ID 0 after create 1 todo should be success', () => {
    const resultString = `Deleted Todo ID: ${0} success`;

    controller.create(createTodoDto);
    const todoList = controller.remove(id.toString());

    expect(todoList).toEqual(resultString);
  });

  // === Error Case ===

  it('findOne ID 99 should be not found', () => {
    try {
      controller.findOne(notFoundId.toString());
    } catch (error) {
      expect(error.status).toEqual(resultNotFoundError.statusCode);
      expect(error.response.statusCode).toEqual(resultNotFoundError.statusCode);
      expect(error.response.message).toEqual(resultNotFoundError.message);
      expect(error.response.error).toEqual(resultNotFoundError.error);
    }
  });

  it('Update ID 99 should be not found', () => {
    try {
      controller.update(notFoundId.toString(), {});
    } catch (error) {
      expect(error.status).toEqual(resultNotFoundError.statusCode);
      expect(error.response.statusCode).toEqual(resultNotFoundError.statusCode);
      expect(error.response.message).toEqual(resultNotFoundError.message);
      expect(error.response.error).toEqual(resultNotFoundError.error);
    }
  });

  it('Remove todo ID 99 should be not found', () => {
    try {
      controller.remove(notFoundId.toString());
    } catch (error) {
      expect(error.status).toEqual(resultNotFoundError.statusCode);
      expect(error.response.statusCode).toEqual(resultNotFoundError.statusCode);
      expect(error.response.message).toEqual(resultNotFoundError.message);
      expect(error.response.error).toEqual(resultNotFoundError.error);
    }
  });
});
