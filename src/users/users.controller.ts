import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import {CreateUserDto } from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {
    // Dependency Injection: creates an instance of the usersService
    constructor(private readonly usersService: UsersService) {}
    
    // GET /users OR /users?role=value
    @Get()
    findAll(@Query('role', ) role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role);
    }
    // GET /users/:id
    @Get(':id') // parameter in the GET request
    findOneUser(@Param('id', ParseIntPipe) id: number) { 
        return this.usersService.findOneUser(id);
    }
    // POST /users
    @Post()
    createUser(@Body(ValidationPipe) user: CreateUserDto) { //Get the body response where User is an object
        return this.usersService.createUser(user);
    }
    // PATCH /users/:id
    @Patch(':id')
    updateOneUser(@Param('id', ParseIntPipe) id:number, @Body(ValidationPipe) userUpdate:UpdateUserDto) {
        //Takes in id in paramenter
        //Returns the updated user
        return this.usersService.updateOneUser(id, userUpdate);

    }
    // DELETE /users/:id
    @Delete(':id')
    deleteOneUser(@Param('id', ParseIntPipe) id:number) {
        return this.usersService.deleteOneUser(id);;
    }
}
