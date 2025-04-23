// apps/users-service/src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY || 'secretKey', // читайте из env
    });
  }

  validate(payload: JwtPayload) {
    // Здесь payload.sub — это user.id
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
