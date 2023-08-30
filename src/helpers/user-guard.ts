import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { CustomException } from './custom.exception';
import { verifyToken } from './helper';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new CustomException(
        'Authorization token missing',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const verify = verifyToken(authorizationHeader);
    if (!verify) {
      throw new CustomException(
        'Invalid authorization token ',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true; // Perform your authentication check here
  }
}
