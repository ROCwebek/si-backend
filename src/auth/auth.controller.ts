import {
  Controller,
  HttpCode,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import type { AuthenticatedRequest } from './guards/authenticated-request.type.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(
      body.email,
      body.password,
    );

    return this.authService.login(user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() request: AuthenticatedRequest) {
    return {
      userId: request.user.sub,
    };
  }
}