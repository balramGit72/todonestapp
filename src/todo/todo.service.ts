import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo | undefined> {
    return this.todoRepository.findOneById(id);
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(todo);
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | undefined> {
    const todoToUpdate = await this.findOne(id);
    if (!todoToUpdate) {
      return undefined;
    }
    if (updateTodoDto.title) todoToUpdate.title = updateTodoDto.title;
    if (updateTodoDto.description)
      todoToUpdate.description = updateTodoDto.description;
    if (updateTodoDto.status || !updateTodoDto.status)
      todoToUpdate.status = updateTodoDto.status;

    const updatedTodo = await this.todoRepository.save(todoToUpdate);
    return updatedTodo;
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
