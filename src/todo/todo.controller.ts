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
import { ApiResponse, ApiTags, ApiHeader } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CustomException } from 'src/helpers/custom.exception'; // Make sure to provide the correct path
import { successResponse } from 'src/helpers/response.helper'; // Make sure to provide the correct path
import {
  TodoCreateResponseDto,
  TodoResponseDto,
  TodosResponseDto,
} from './dto/response.dto';
import { AuthGuard } from 'src/helpers/user-guard';
import {
  BEARER_TOKEN,
  TODO_DATA_NOT_FOUND,
  TODO_ITEMS_RETRIEVED,
  TODO_ITEM_DELETED,
  TODO_ITEM_RETRIEVED,
  TODO_SUCCESS_MESSAGE,
  TODO_SUCCESS_UPDATED_MESSAGE,
} from 'src/helpers/constant';

@ApiTags('todos')
@Controller('todos')
@UseGuards(AuthGuard)
@ApiHeader({
  name: 'Authorization',
  description: BEARER_TOKEN,
  required: true,
})
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: TODO_ITEMS_RETRIEVED,
    type: TodosResponseDto,
  })
  async findAll(@Res() res: Response) {
    try {
      const todos = await this.todoService.findAll();
      successResponse(res, TODO_ITEMS_RETRIEVED, todos);
    } catch (error) {
      const customError = error as { response: string; status: HttpStatus };
      throw new CustomException(customError.response, customError.status);
    }
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: TODO_ITEM_RETRIEVED,
    type: TodoResponseDto,
  })
  async findOne(@Param('id') id: number, @Res() res: Response) {
    try {
      const todo = await this.todoService.findOne(id);
      if (!todo) {
        throw new CustomException(TODO_DATA_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      successResponse(res, TODO_ITEM_RETRIEVED, todo);
    } catch (error) {
      const customError = error as { response: string; status: HttpStatus };
      throw new CustomException(customError.response, customError.status);
    }
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: TODO_SUCCESS_MESSAGE,
    type: TodoCreateResponseDto,
  })
  async create(@Body() createTodoDto: CreateTodoDto, @Res() res: Response) {
    try {
      const createTodo = await this.todoService.create(createTodoDto);
      successResponse(
        res,
        TODO_SUCCESS_MESSAGE,
        createTodo,
        HttpStatus.CREATED,
      );
    } catch (error) {
      const customError = error as { response: string; status: HttpStatus };
      throw new CustomException(customError.response, customError.status);
    }
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: TODO_SUCCESS_UPDATED_MESSAGE,
    type: TodoCreateResponseDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Res() res: Response,
  ) {
    try {
      const updatedTodo = await this.todoService.update(id, updateTodoDto);
      if (!updatedTodo) {
        throw new CustomException(TODO_DATA_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      successResponse(
        res,
        TODO_SUCCESS_UPDATED_MESSAGE,
        updatedTodo,
        HttpStatus.OK,
      );
    } catch (error) {
      const customError = error as { response: string; status: HttpStatus };
      throw new CustomException(customError.response, customError.status);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: TODO_ITEM_DELETED,
    type: null,
  })
  async remove(@Param('id') id: number, @Res() res: Response) {
    try {
      const todo = await this.todoService.findOne(id);
      if (!todo) {
        console.log(TODO_DATA_NOT_FOUND);
        throw new CustomException(TODO_DATA_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      await this.todoService.remove(id);
      successResponse(res, TODO_ITEM_DELETED, null, HttpStatus.NO_CONTENT);
    } catch (error: any) {
      const customError = error as { response: string; status: HttpStatus };
      throw new CustomException(customError.response, customError.status);
    }
  }
}
