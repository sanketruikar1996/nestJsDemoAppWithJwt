import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as Crypto from 'crypto-js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
  ) {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.mail = email;
    user.password = String(Crypto.SHA256(password));
    user.phone = phone;

    await this.userRepository.save(user);
    return user;
  }

  async signIn(mail: string, password: string) {
    const user = await this.userRepository.findOneBy({
      mail,
      password: String(Crypto.SHA256(password)),
    });

    if (!user) {
      throw new NotFoundException();
    }

    const payload = {
      id: user.id,
      email: user.mail,
    };

    return { token: await this.jwtService.signAsync(payload) };
  }
}
