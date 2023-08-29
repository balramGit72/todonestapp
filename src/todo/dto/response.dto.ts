import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '../todo.entity';

export class TodoResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  data: Todo; // Use any type that represents your data structure

  @ApiProperty()
  message: string;

  @ApiProperty()
  timestamp: Date;
}

export class TodosResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({ type: [Todo] })
  data: Todo[]; // Use any type that represents your data structure

  @ApiProperty()
  message: string;

  @ApiProperty()
  timestamp: Date;
}

export class TodoCreateResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  data: Todo; // Use any type that represents your data structure

  @ApiProperty()
  message: string;

  @ApiProperty()
  timestamp: Date;
}
