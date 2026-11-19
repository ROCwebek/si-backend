import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { UserEntity } from '../users/entities/user.entity.js';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';


@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<UserEntity> {
        const user = await this.usersService.findUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException("Ugyldige loginoplysninger");
        }

        const isPasswordValid = await argon2.verify(
            user.user_password,
            password
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException("Ugyldige loginoplysninger");
        }

        return user;
    }

    async login(user: UserEntity) {

        const payload = {
            sub: user.user_pk
        };

        const accessToken = await this.jwtService.signAsync(payload)

        return {
            access_token: accessToken,
            user: {
                user_pk: user.user_pk,
                user_name: user.user_name,
                user_email: user.user_email
            }
        };
    }

}