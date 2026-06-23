import { Injectable } from '@nestjs/common';
import { Theme, Niveau } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async findByThemeAndNiveau(theme: Theme, niveau: Niveau) {
    const questions = await this.prisma.question.findMany({
      where: { theme, niveau },
    });
    return this.shuffle(questions);
  }

  private shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
