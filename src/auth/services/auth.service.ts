import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}
    async validateUser(name: string, pass: string): Promise<any> {
        console.log('validateUser');
        const user = await this.usersService.findUserByName(name);
        if (user) {
            const match = await bcrypt.compare(pass, user.password);
            if(match){
                const { password, ...result } = user.toJSON();
                return result;
            }
        }
        return null;
      }
}
