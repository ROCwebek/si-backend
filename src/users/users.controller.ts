import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { HttpCode } from '@nestjs/common';
import { UserEntity } from './entities/user.entity.js';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
        getAllUsers(): Promise<UserEntity[]> {
            return this.usersService.getAllUsers()
        }

    @Get(":id")
    getUserById(@Param("id") id: string): Promise<UserEntity> {
        return this.usersService.getUserById(id)
    }

    @Post()
    addUser(@Body() user: CreateUserDto): Promise<string> {
        return this.usersService.addUser(user);
    }

/*     @Patch(':id')
    updateUser(@Param("id") id: string, @Body() user: UpdateUserDto): Promise<UserEntity> {
        return this.usersService.updateUser(id, user)
    }

    @Delete(':id')
    @HttpCode(204)
    deleteUser(@Param("id") id: string): Promise<void> {
        return this.usersService.deleteUser(id)
    } */


}
