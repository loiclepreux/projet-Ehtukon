import { Injectable, NotFoundException } from '@nestjs/common';
import { Theme, Niveau } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async findByThemeAndNiveau(theme: Theme, niveau: Niveau) {
    const questions = await this.prisma.question.findMany({
      where: { theme, niveau },
      // On n'envoie jamais la bonne réponse ni l'explication au navigateur
      select: {
        id: true,
        theme: true,
        niveau: true,
        question: true,
        rep1: true,
        rep2: true,
        rep3: true,
        rep4: true,
      },
    });
    return this.shuffle(questions);
  }

  async checkAnswer(id: number, answer: number) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      select: { repCorrecte: true, explication: true },
    });
    if (!question) throw new NotFoundException('Question introuvable');

    return {
      correct: answer === question.repCorrecte,
      repCorrecte: question.repCorrecte,
      explication: question.explication,
    };
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
