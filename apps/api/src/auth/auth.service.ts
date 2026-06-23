import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly accessExpiresIn: string;
  private readonly refreshExpiresIn: string;

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {
    this.accessExpiresIn = config.get('JWT_ACCESS_EXPIRES_IN', '15m');
    this.refreshExpiresIn = config.get('JWT_REFRESH_EXPIRES_IN', '7d');
  }

  async register(dto: RegisterDto, res: Response) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email déjà utilisé');

    const hash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: { nom: dto.nom, email: dto.email, password: hash },
      select: { id: true, nom: true, email: true, createdAt: true },
    });

    return this.issueTokens(user, res);
  }

  async login(dto: LoginDto, res: Response) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Identifiants invalides');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Identifiants invalides');

    const { password: _, ...userSafe } = user;
    return this.issueTokens(userSafe, res);
  }

  async refresh(userId: number, oldToken: string, res: Response) {
    await this.prisma.refreshToken.deleteMany({ where: { token: oldToken } });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, nom: true, email: true, createdAt: true },
    });
    if (!user) throw new UnauthorizedException();

    return this.issueTokens(user, res);
  }

  async logout(userId: number, refreshToken: string, res: Response) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId, token: refreshToken },
    });
    this.clearCookies(res);
  }

  private async issueTokens(
    user: { id: number; nom: string; email: string; createdAt: Date },
    res: Response,
  ) {
    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwt.sign(payload, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
      expiresIn: this.accessExpiresIn as never,
    });

    const refreshToken = this.jwt.sign(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      expiresIn: this.refreshExpiresIn as never,
    });

    const refreshExpiresAt = new Date();
    refreshExpiresAt.setDate(refreshExpiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: { token: refreshToken, userId: user.id, expiresAt: refreshExpiresAt },
    });

    this.setCookies(res, accessToken, refreshToken);

    return { user, accessToken, refreshToken };
  }

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    const isProd = this.config.get('NODE_ENV') === 'production';
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: isProd,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: isProd,
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  private clearCookies(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token', { path: '/auth/refresh' });
  }
}
