import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SystemLogsService } from 'src/system-logs/system-logs.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly systemLogsService: SystemLogsService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        this.systemLogsService.printOut(`validate user ${username} ${pass}`)
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user
            return result
        }
        return null

    }

}
