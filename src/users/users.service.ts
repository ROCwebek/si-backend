import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity.js';
import { RoleEntity } from './entities/role.entity.js';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto.js';
import * as argon2 from 'argon2';
import type { User } from './types/user.type.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: {
        role: true,
      },
    });

    return users.map((user) => this.toUser(user));
  }

  // For controllers: safe to send to the client
  async getProfile(id: string): Promise<User> {
    const user = await this.getUserById(id);
    return this.toUser(user);
  }

  // For internal use (guards, other services): the full entity.
  // Never return this straight from a controller.
  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        user_pk: id,
      },
      relations: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Ingen bruger blev fundet');
    }

    return user;
  }

  async addUser(user: CreateUserDto): Promise<string> {
    const userRole = await this.roleRepository.findOneBy({
      role: 'user',
    });

    if (!userRole) {
      throw new InternalServerErrorException('Standardrollen user findes ikke');
    }

    // Email and username are unique in the database. Checking first gives a
    // 409 with a clear message instead of a 500 from the database.
    const emailTaken = await this.userRepository.existsBy({
      user_email: user.user_email,
    });

    if (emailTaken) {
      throw new ConflictException('Email er allerede i brug');
    }

    const nameTaken = await this.userRepository.existsBy({
      user_name: user.user_name,
    });

    if (nameTaken) {
      throw new ConflictException('Brugernavnet er allerede taget');
    }

    const hashedPassword = await argon2.hash(user.user_password, {
      type: argon2.argon2id,
    });

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

    return 'User created succesfully';
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<void> {
    const existingUser = await this.userRepository.findOneBy({
      user_pk: id,
    });

    if (!existingUser) {
      throw new NotFoundException('Ingen bruger at opdatere');
    }

    // Only check for duplicates when the value is actually changed,
    // otherwise the user would conflict with themself
    if (
      user.user_name !== undefined &&
      user.user_name !== existingUser.user_name
    ) {
      const nameTaken = await this.userRepository.existsBy({
        user_name: user.user_name,
      });

      if (nameTaken) {
        throw new ConflictException('Brugernavnet er allerede taget');
      }

      existingUser.user_name = user.user_name;
    }

    if (
      user.user_email !== undefined &&
      user.user_email !== existingUser.user_email
    ) {
      const emailTaken = await this.userRepository.existsBy({
        user_email: user.user_email,
      });

      if (emailTaken) {
        throw new ConflictException('Email er allerede i brug');
      }

      existingUser.user_email = user.user_email;
    }

    await this.userRepository.save(existingUser);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete({
      user_pk: id,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Ingen bruger at slette');
    }
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const existingUser = await this.userRepository.findOneBy({
      user_email: email,
    });

    return existingUser;
  }

  private toUser(user: UserEntity): User {
    return {
      user_pk: user.user_pk,
      user_name: user.user_name,
      user_email: user.user_email,
      role: user.role.role,
      created_at: user.created_at,
      verified_at: user.verified_at,
    };
  }
}
