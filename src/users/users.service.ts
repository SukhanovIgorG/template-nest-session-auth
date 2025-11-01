import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';

import * as bcrypt from 'bcrypt';
// import { type User } from 'types';
import { bcryptConstant } from './constants';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { email } });
  }

  async findByRefreshToken(refreshToken: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { refreshToken } });
  }

  async create(dto: RegisterAuthDto): Promise<User> {
    const hashPassword = await bcrypt.hash(
      dto.password,
      bcryptConstant.saltOrRounds,
    );
    const newUser = {
      email: dto.email,
      password: hashPassword,
      roles: ['user'],
      username: 'username',
      refreshToken: undefined,
    };
    const createdUser = await this.userRepo.save(newUser);
    return createdUser;
  }

  async updateRefreshToken(
    userId: User['id'],
    refreshToken: string,
  ): Promise<UpdateResult> {
    return this.userRepo.update(userId, { refreshToken });
  }

  async getUsersList(): Promise<User[]> {
    return this.userRepo.find();
  }
}
