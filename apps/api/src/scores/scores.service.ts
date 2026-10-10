import { BadRequestException, Injectable } from '@nestjs/common';
import { Theme, Niveau } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class ScoresService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateScoreDto) {
    const theme = dto.theme as unknown as Theme;
    const niveau = dto.niveau as unknown as Niveau;

    // Une seule réponse par question (on ignore les doublons)
    const answers = new Map(dto.answers.map((a) => [a.questionId, a.answer]));

    // On va chercher les bonnes réponses en base : c'est l'API qui corrige
    const questions = await this.prisma.question.findMany({
      where: { id: { in: [...answers.keys()] }, theme, niveau },
      select: { id: true, repCorrecte: true },
    });

    if (questions.length === 0) {
      throw new BadRequestException('Aucune question valide pour ce quiz');
    }

    const points = questions.filter(
      (q) => answers.get(q.id) === q.repCorrecte,
    ).length;

    return this.prisma.score.create({
      data: { userId, theme, niveau, points, total: questions.length },
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
