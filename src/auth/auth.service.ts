import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

import { type User } from 'types';

const DB: { users: User[] } = {
  users: [],
};

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private async getAuth(user: User) {
    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    DB.users = DB.users.map((u) => {
      if (u.id === user.id) {
        u.refreshToken = refreshToken;
      }
      return u;
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async register(registerAuthDto: RegisterAuthDto) {
    DB.users.push(registerAuthDto as User);
    return await this.getAuth(registerAuthDto as User);
  }

  async login(LoginAuthDto: LoginAuthDto) {
    const user = DB.users.find(
      (user) =>
        user.email === LoginAuthDto.email &&
        user.password === LoginAuthDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.getAuth(user);
  }

  async refresh(refreshToken: string) {
    const user = DB.users.find((user) => user.refreshToken === refreshToken);
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.getAuth(user);
  }
}
