import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, password, email }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      message: 'User created successfully',
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email };
    const token = this.jwtService.signAsync(payload);

    return {
      //email: user.email,
      email,
      token,
    };
  }
}
