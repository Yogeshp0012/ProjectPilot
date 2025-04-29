import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

// SanitizedUser interface to define the structure of the user object returned after authentication (TODO: define globally if needed)
interface SanitizedUser {
  id: string;
  displayName: string;
  emailAddress: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'emailAddress' }); // Using 'emailAddress' as username field
  }

  async validate(email: string, password: string): Promise<SanitizedUser> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
