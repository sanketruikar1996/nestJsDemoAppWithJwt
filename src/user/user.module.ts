import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/config';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
  JwtModule.register({
    global: true,
    secret: config.secret,
    signOptions: { expiresIn: '2h' },
  }),],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
