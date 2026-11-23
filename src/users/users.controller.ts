import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  HttpCode,
  Req,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { AuthenticatedRequest } from '../auth/types/authenticated-request.type.js';
import type { User } from './types/user.type.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Sign up: public
  @Post()
  addUser(@Body() user: CreateUserDto): Promise<string> {
    return this.usersService.addUser(user);
  }

  // ---- The logged-in user's own account ----
  // The user always comes from the JWT, never the URL.
  // These must stay above the ':id' routes, otherwise 'my-profile' is read as an id.

  @Get('my-profile')
  @UseGuards(JwtAuthGuard)
  getMyProfile(@Req() req: AuthenticatedRequest): Promise<User> {
    return this.usersService.getProfile(req.user.sub);
  }

  @Patch('my-profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  updateMyProfile(
    @Req() req: AuthenticatedRequest,
    @Body() user: UpdateUserDto,
  ): Promise<void> {
    return this.usersService.updateUser(req.user.sub, user);
  }

  @Delete('my-profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  deleteMyProfile(@Req() req: AuthenticatedRequest): Promise<void> {
    return this.usersService.deleteUser(req.user.sub);
  }

  // ---- Admin only: see all users and delete a user. ----
  // Admins cannot edit other users' details; only users can edit themselves.

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(204)
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
