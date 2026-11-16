import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity.js';
import { RoleEntity } from './entities/role.entity.js';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto.js';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ) { }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }

    async getUserById(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({
            user_pk: id
        })
        
        if (!user) {
           throw new NotFoundException("Ingen bruger blev fundet")
        }

        return user
    }

async addUser(user: CreateUserDto): Promise<string> {
    const userRole = await this.roleRepository.findOneBy({
        role: "user"
    });

    if (!userRole) {
        throw new InternalServerErrorException(
            "Standardrollen user findes ikke"
        );
    }

    const hashedPassword = await argon2.hash(
        user.user_password,
        { type: argon2.argon2id }
    );

    const newUser = this.userRepository.create({
        user_pk: uuidv4(),
        user_name: user.user_name,
        user_email: user.user_email,
        user_password: hashedPassword,
        role: userRole,
        verification_key: uuidv4(),
        verified_at: null,
        reset_password_key: null,
    });

    await this.userRepository.save(newUser);

    return "Brugeren blev oprettet succesfuldt"
}

    async updateUser(id: string, user: UpdateUserDto): Promise<UserEntity> {
        const existingUser = await this.userRepository.findOneBy({
            user_pk: id
        })

        if (!existingUser) {
            throw new NotFoundException("Ingen bruger at opdatere")
        }

        Object.assign(existingUser, user)

        return this.userRepository.save(existingUser)
    }

    async deleteUser(id: string): Promise<void> {

        const result = await this.userRepository.delete({
            user_pk: id
        })

        if(result.affected === 0) {
            throw new NotFoundException("Ingen bruger at slette")
        }
    }

}
