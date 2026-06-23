import { IsEnum } from 'class-validator';

export enum Theme {
  html = 'html',
  css = 'css',
  javascript = 'javascript',
  php = 'php',
  sql = 'sql',
}

export enum Niveau {
  facile = 'facile',
  moyen = 'moyen',
  difficile = 'difficile',
}

export class GetQuestionsDto {
  @IsEnum(Theme)
  theme: Theme;

  @IsEnum(Niveau)
  niveau: Niveau;
}
