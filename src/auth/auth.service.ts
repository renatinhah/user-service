import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log(`Validating user: ${username}`);
    const user = await this.usersService.findByName(username);

    if (user) {
      const passwordMatch = await bcrypt.compare(pass, user.password);
      console.log('Password match:', passwordMatch);

      if (passwordMatch) {
        const { password: _, ...result } = user;
        return result;
      }
    }
    console.log('Password dont match!');
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
