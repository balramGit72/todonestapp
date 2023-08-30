import { Injectable } from '@nestjs/common';
import { createJwtToken } from 'src/helpers/helper';

@Injectable()
export class AppService {
  getHello(): string {
    return 'OK!';
  }

  getToken(): string {
    return createJwtToken({
      data: 'application authorize token',
    });
  }
}
