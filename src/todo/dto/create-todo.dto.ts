import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @ApiProperty()
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  @ApiProperty()
  description: string;

  @IsBoolean({ message: 'Status must be a boolean' })
  @IsNotEmpty({ message: 'Status cannot be empty' })
  @ApiProperty()
  status: boolean;
}
