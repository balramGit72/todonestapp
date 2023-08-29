import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CustomException } from 'common/helpers/custom.exception'; // Make sure to provide the correct path
import { successResponse } from 'common/helpers/response.helper'; // Make sure to provide the correct path
import {
  TodoCreateResponseDto,
  TodoResponseDto,
  TodosResponseDto,
} from './dto/response.dto';
import { AuthGuard } from 'common/helpers/user-guard';

@ApiTags('todos')
@Controller('todos')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Todo item has been successfully retrieved.',
    type: TodosResponseDto, // The response type (class or DTO)
  })
  async findAll(@Res() res: Response) {
    try {
      const todos = await this.todoService.findAll();
      successResponse(res, 'Todo retrieved successfully', todos);
    } catch (error) {
      console.log('error: ', error);
      // Handle other exceptions here if needed
      const customError = error as { response: string; status: HttpStatus };
      throw new CustomException(
        customError.response || 'Error retrieving todo',
        customError.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Todo item has been successfully retrieved.',
    type: TodoResponseDto, // The response type (class or DTO)
  })
  async findOne(@Param('id') id: number, @Res() res: Response) {
    try {
      const todo = await this.todoService.findOne(id);
      if (!todo) {
        throw new CustomException('Todo not found', HttpStatus.NOT_FOUND);
      }
      successResponse(res, 'Todo retrieved successfully', todo);
    } catch (error) {
      // Handle other exceptions here if needed
      const customError = error as { response: string; status: HttpStatus };
      throw new CustomException(
        customError.response || 'Error retrieving todo',
        customError.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Todo item has been successfully retrieved.',
    type: TodoCreateResponseDto, // The response type (class or DTO)
  })
  async create(@Body() createTodoDto: CreateTodoDto, @Res() res: Response) {
    try {
      const createTodo = await this.todoService.create(createTodoDto);
      successResponse(
        res,
        'Todo created successfully',
        createTodo,
        HttpStatus.CREATED,
      );
    } catch (error) {
      // Handle other exceptions here if needed
      const customError = error as { response: string; status: HttpStatus };
      throw new CustomException(
        customError.response || 'Error retrieving todo',
        customError.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Todo item has been successfully retrieved.',
    type: TodoCreateResponseDto, // The response type (class or DTO)
  })
  async update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Res() res: Response,
  ) {
    try {
      const updatedTodo = await this.todoService.update(id, updateTodoDto);
      if (!updatedTodo) {
        throw new CustomException('Todo not found', HttpStatus.NOT_FOUND);
      }
      successResponse(
        res,
        'Todo updated successfully',
        updatedTodo,
        HttpStatus.OK,
      );
    } catch (error) {
      // Handle other exceptions here if needed
      const customError = error as { response: string; status: HttpStatus };
      throw new CustomException(
        customError.response || 'Error retrieving todo',
        customError.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The Todo item has been successfully retrieved.',
    type: null, // The response type (class or DTO)
  })
  async remove(@Param('id') id: number, @Res() res: Response) {
    try {
      const todo = await this.todoService.findOne(id);
      console.log('todo: ', todo);
      if (!todo) {
        console.log('todo not found');
        throw new CustomException('Todo not found', HttpStatus.NOT_FOUND);
      }
      await this.todoService.remove(id);
      successResponse(
        res,
        'Todo deleted successfully',
        null,
        HttpStatus.NO_CONTENT,
      );
    } catch (error: any) {
      // Handle other exceptions here if needed
      const customError = error as { response: string; status: HttpStatus };
      throw new CustomException(
        customError.response || 'Error retrieving todo',
        customError.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
