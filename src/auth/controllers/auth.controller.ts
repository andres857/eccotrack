import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: Request) {
        console.log('-------login-----');
        return req.user;
    }
    @Post('logout')
    async lo() { 
        console.log('logout');
    }
}
