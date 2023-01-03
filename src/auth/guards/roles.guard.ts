import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
      const roles = this.reflector.getAllAndOverride<number[]>('roles',  [context.getHandler(),  context.getClass()]);
      console.log("roles",roles)
      if (roles == null) {
        return true;
      }
      const {user} = context.switchToHttp().getRequest();
      console.log("user",user)
      return roles.some((role) => user.role == role);
    }
}

