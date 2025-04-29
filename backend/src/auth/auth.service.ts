import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

interface SanitizedUser {
  id: string;
  displayName: string;
  emailAddress: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  /// Validate user credentials
  async validateUser(email: string, password: string): Promise<SanitizedUser | null> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) return null;

    const passwordMatches = await bcrypt.compare(password, user.hashedPassword);
    if (passwordMatches) {
      const { userId, displayName, emailAddress } = user;
      return { id: userId.toString(), displayName, emailAddress };
    }
    return null;
  }

  login(user: SanitizedUser) {
    const payload = { username: user.displayName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
