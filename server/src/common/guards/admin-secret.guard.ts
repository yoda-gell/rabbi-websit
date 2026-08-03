import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

/**
 * Stub admin protection: compares an `x-admin-secret` header to
 * ADMIN_API_SECRET. This is NOT tied to the Next.js /admin session cookie —
 * it's a placeholder until a real cross-service auth strategy is decided
 * (e.g. a shared JWT, or a service-to-service secret passed from the
 * Next.js Server Action that calls this API).
 */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const provided = request.headers['x-admin-secret'];
    const expected = process.env.ADMIN_API_SECRET;

    if (!expected || provided !== expected) {
      throw new UnauthorizedException('Missing or invalid admin credentials');
    }
    return true;
  }
}
