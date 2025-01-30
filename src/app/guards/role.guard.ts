import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { JWTHelper } from '../helpers';
import { UserRole } from '@src/shared';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.authUser;
    Logger.log('🚀 ~ DMRoleGuard ~ canActivate ~ user:', user);

    if (!user || !user.role?.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException('Unauthorized request!');
    }

    // Your guard logic here
    return true;
  }
}