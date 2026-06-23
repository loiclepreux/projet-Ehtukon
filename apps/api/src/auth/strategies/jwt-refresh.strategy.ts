import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.refresh_token ?? null,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_REFRESH_SECRET')!,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const token =
      req.cookies?.refresh_token ??
      req.headers.authorization?.replace('Bearer ', '');

    if (!token) throw new UnauthorizedException();

    const stored = await this.prisma.refreshToken.findUnique({
      where: { token },
      include: { user: { select: { id: true, nom: true, email: true, createdAt: true } } },
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException();
    }

    return { ...stored.user, refreshToken: token };
  }
}
