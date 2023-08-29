import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @ApiProperty()
  title?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'Status must be a boolean' })
  @ApiProperty()
  status?: boolean;
}
