import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { UserEntity } from './entities/user.entity.js';
import { RoleEntity } from './entities/role.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserEntity,
    RoleEntity
  ])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}