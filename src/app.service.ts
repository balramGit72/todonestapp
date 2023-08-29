import { Injectable } from '@nestjs/common';
import { createJwtToken } from 'common/helpers/helper';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getToken(): string {
    return createJwtToken({
      data: 'application authorize token',
    });
  }
}
