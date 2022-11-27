import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;

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
    const todoDto: CreateTodoDto = {
      name: 'test name',
      description: 'Test desc',
    };
    const resultTodoDto: CreateTodoDto = {
      id: 0,
      name: 'test name',
      description: 'Test desc',
      status: TodoStatus.TODO,
    };
    const todoList = controller.create(todoDto);
    expect(todoList).toEqual(resultTodoDto);
  });

  it('findAll after create 1 todo should be 1 item', () => {
    const todoDto: CreateTodoDto = {
      name: 'test name',
      description: 'Test desc',
    };

    const resultTodoDto: CreateTodoDto[] = [
      {
        id: 0,
        name: 'test name',
        description: 'Test desc',
        status: TodoStatus.TODO,
      },
    ];

    controller.create(todoDto);
    const todoList = controller.findAll();

    expect(todoList).toEqual(resultTodoDto);
  });

  it('findOne ID 0 after create 1 todo should be success', () => {
    const todoDto: CreateTodoDto = {
      name: 'test name',
      description: 'Test desc',
    };

    const resultTodoDto: CreateTodoDto = {
      id: 0,
      name: 'test name',
      description: 'Test desc',
      status: TodoStatus.TODO,
    };

    controller.create(todoDto);
    const todoList = controller.findOne('0');

    expect(todoList).toEqual(resultTodoDto);
  });

  it('findOne ID 0 after create and update 1 todo should be success', () => {
    const createTodoDto: CreateTodoDto = {
      name: 'test name',
      description: 'Test desc',
    };
    const updateTodoDto: UpdateTodoDto = {
      name: 'test name 123',
      description: 'Test desc 456',
    };

    const resultTodoDto: CreateTodoDto = {
      id: 0,
      name: 'test name 123',
      description: 'Test desc 456',
      status: TodoStatus.TODO,
    };

    controller.create(createTodoDto);
    controller.update('0', updateTodoDto);
    const todoList = controller.findOne('0');

    expect(todoList).toEqual(resultTodoDto);
  });

  it('Remove todo ID 0 after create 1 todo should be success', () => {
    const createTodoDto: CreateTodoDto = {
      name: 'test name',
      description: 'Test desc',
    };

    const resultString = `Deleted Todo ID: ${0} success`;

    controller.create(createTodoDto);
    const todoList = controller.remove('0');

    expect(todoList).toEqual(resultString);
  });
});
