import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { BEARER_TOKEN } from './helpers/constant';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Health check',
    type: String,
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: BEARER_TOKEN,
    type: String,
  })
  getToken(): string {
    return this.appService.getToken();
  }
}
