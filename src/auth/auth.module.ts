import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

// import { AuthGuard } from './auth.guard';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './roles.guard';

// providers: [
//   AuthService,
//   { provide: 'APP_GUARD', useClass: AuthGuard },
//   {
//     provide: APP_GUARD,
//     useClass: RolesGuard,
//   },
// ],
