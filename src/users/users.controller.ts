import { Controller, Get, Post, Body , Put, Delete} from '@nestjs/common';
import { UsersService  } from './users.service'

@Controller('users')
export class UsersController {
    constructor( private userService: UsersService ){}
    @Get()
    getUsers(){
        const clients = this.userService.findAll();
        return clients;
    }
    @Post('create')
    create(@Body() payload: any){
        const newClient = this.userService.create(payload);
        return newClient;
    }
    // @Put()
    // updateClient(@Body() payload: any){
    //     const newClient = this.clientService.update(payload);
    //     return newClient;
    // }
    // @Delete()
    // deleteClient(@Body() payload: any){
    //     const deleteClient = this.clientService.delete(payload);
    //     return deleteClient;
    // }
}