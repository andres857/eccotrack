import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local'){
    constructor(private authService: AuthService){
        super(
            {
                usernameField: 'username',
                passwordField: 'password'
            }
        );
    }
    async validate(name: string, password: string): Promise<any>{
        console.log('validate');
        const user = await this.authService.validateUser(name, password);
        if(!user){
            throw new UnauthorizedException('no autorizado');
        }
        return user;
    }
}