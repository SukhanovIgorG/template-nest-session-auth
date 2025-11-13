import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';

import * as bcrypt from 'bcrypt';
// import { type User } from 'types';
import { bcryptConstant } from './constants';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../shared/models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepo.findOne({ where: { email } });
  }

  async findByRefreshToken(refreshToken: string): Promise<UserEntity | null> {
    return await this.userRepo.findOne({ where: { refreshToken } });
  }

  async create(dto: RegisterAuthDto): Promise<UserEntity> {
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
    userId: UserEntity['id'],
    refreshToken: string,
  ): Promise<UpdateResult> {
    return this.userRepo.update(userId, { refreshToken });
  }

  async getUsersList(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }
}
