import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        console.log(`route required roles: ${JSON.stringify(roles)}`)
        if (!roles) {
            return true
        }
        const request = context.switchToHttp().getRequest()
        const user = request.user
        console.log(`user: ${JSON.stringify(user)}`)

        const hasRole = () => user.roles.some((role) => roles.includes(role));

        return user && user.roles && hasRole();
    }
}