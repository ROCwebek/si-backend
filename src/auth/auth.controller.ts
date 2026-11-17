import { Controller, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('login')
    @HttpCode(200)
    async login(@Body() body: LoginDto) {
        await this.authService.validateUser(body.email, body.password)

        return "Login succesfull"
    }
}
