import { IsEnum, IsInt, Min, Max } from 'class-validator';

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

export class CreateScoreDto {
  @IsEnum(Theme)
  theme: Theme;

  @IsEnum(Niveau)
  niveau: Niveau;

  @IsInt()
  @Min(0)
  points: number;

  @IsInt()
  @Min(1)
  @Max(100)
  total: number;
}
