import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export function successResponse(
  res: Response,
  message: string,
  data: any,
  statusCode: HttpStatus = HttpStatus.OK,
) {
  res.status(statusCode).json({
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
}
