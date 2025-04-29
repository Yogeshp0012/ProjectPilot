import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  sub: string;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
      secretOrKey: secret,
    });
  }

  validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.username }; // Validate the JWT payload
  }
}
