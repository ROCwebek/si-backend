
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from '../types/jwt-payload.type.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Access denied');
    }

    const parts = authorization.split(' ');
    const token = parts[1];

    if (parts.length !== 2 || parts[0] !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (
      !payload ||
      typeof payload.sub !== 'string' ||
      !payload.sub.trim()
    ) {
      throw new UnauthorizedException('Invalid token payload');
    }

    request.user = payload;

    return true;
  }
}
