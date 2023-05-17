import { Controller, Get, Post, Body , Put, Delete} from '@nestjs/common';
import { ClientsService  } from './clients.service'

@Controller('clients')
export class ClientsController {
    constructor( private clientService: ClientsService ){}
    @Get()
    getclients(){
        const clients = this.clientService.findAll()
        return clients
    }
    @Post()
    create(@Body() payload: any){
        const newClient = this.clientService.create(payload)
        return newClient
    }
    @Put()
    updateClient(@Body() payload: any){
        const newClient = this.clientService.update(payload)
        return newClient
    }
    @Delete()
    deleteClient(@Body() payload: any){
        const deleteClient = this.clientService.delete(payload)
        return deleteClient
    }
}