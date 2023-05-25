import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { config } from 'src/user/config/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //get the http request

    const request: Request = context.switchToHttp().getRequest();
    //get token
    const token = this.extractToken(request);
    console.log(token);

    if (!token) {
      throw new UnauthorizedException();
    }
    //verify that token
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.secret,
      });

      //add the payload to request

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
