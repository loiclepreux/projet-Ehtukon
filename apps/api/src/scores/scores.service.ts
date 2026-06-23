import { Injectable } from '@nestjs/common';
import { Theme, Niveau } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class ScoresService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateScoreDto) {
    return this.prisma.score.create({
      data: {
        userId,
        theme: dto.theme as unknown as Theme,
        niveau: dto.niveau as unknown as Niveau,
        points: dto.points,
        total: dto.total,
      },
      include: { user: { select: { id: true, nom: true } } },
    });
  }

  async getLeaderboard(theme: Theme, niveau: Niveau, limit = 10) {
    const scores = await this.prisma.score.findMany({
      where: { theme, niveau },
      orderBy: [{ points: 'desc' }, { createdAt: 'asc' }],
      take: limit,
      include: { user: { select: { id: true, nom: true } } },
    });

    return scores.map((s, index) => ({
      rank: index + 1,
      user: s.user,
      points: s.points,
      total: s.total,
      createdAt: s.createdAt,
    }));
  }

  async getMyScores(userId: number) {
    return this.prisma.score.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
